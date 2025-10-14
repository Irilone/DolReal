# Router Plan – ASUS RT-AX86U Pro (Asuswrt-Merlin)

## Objectives
- Guarantee stable upstream bandwidth for four 1080p30 YouTube RTMP feeds (max 24 Mbps total).
- Prioritise OBS workstations and InfraNodus MCP traffic, while isolating guest devices.
- Provide operational playbooks for failover and monitoring during Nov 6–7, 2025.

## Baseline Firmware & Access
- Firmware: Asuswrt-Merlin **3004.388.6_2** or later.
- Enable JFFS and custom scripts: *Administration → System → Persistent JFFS2 partition* (format on next boot).
- SSH access: enable under *Administration → System*; limit to LAN; change default port to 2222.
- Store automation scripts under `/jffs/scripts/`; set `chmod 755`.

## WAN & QoS Configuration
1. **Bandwidth profiling**  
   - Measure ISP upload off-peak (expected 250 Mbps).  
   - Set manual bandwidth to 200 Mbps (Upload) / 500 Mbps (Download) in *Adaptive QoS → QoS → Manual* to ensure queue discipline.
2. **Adaptive QoS rules**  
   - Create custom category `DoL-RTMP` (TCP 1935, 443, 7443). Mark as *Highest*.  
   - Tag OBS workstation MAC addresses (primary + backup) as *Work-From-Home* profile.
3. **Traffic Control Script** (`/jffs/scripts/firewall-start`)  
   ```sh
   # Prioritise RTMP (1935) and InfraNodus MCP (8443)
   iptables -t mangle -A PREROUTING -p tcp --dport 1935 -j MARK --set-mark 0x1
   iptables -t mangle -A PREROUTING -p tcp --dport 8443 -j MARK --set-mark 0x2
   tc qdisc add dev eth0 root handle 1: htb default 30
   tc class add dev eth0 parent 1: classid 1:1 htb rate 200mbit ceil 200mbit
   tc class add dev eth0 parent 1:1 classid 1:10 htb rate 160mbit ceil 200mbit prio 0
   tc class add dev eth0 parent 1:1 classid 1:20 htb rate 30mbit ceil 80mbit prio 1
   tc filter add dev eth0 parent 1: protocol ip handle 0x1 fw flowid 1:10
   tc filter add dev eth0 parent 1: protocol ip handle 0x2 fw flowid 1:20
   ```
   - Reload via `service restart_firewall`.
4. **Limit guest throughput**: *Guest Network → Bandwidth limiter* to 5 Mbps up/down.

## LAN Topology & VLANs
- LAN Port 1 → OBS primary PC  
- LAN Port 2 → OBS backup PC  
- LAN Port 3 → InfraNodus MCP host  
- LAN Port 4 → Production switch (teams, admin)  
- Create VLAN 20 for streaming gear via `robocfg`. Isolation prevents guest traffic from saturating LAN.

## Port Forwarding & Firewall
| Service | External Port | Internal Host | Note |
|---------|---------------|--------------|------|
| RTMP    | 1935/TCP      | OBS primary  | Required if YouTube fallback uses RTMP ingest via custom gateways |
| MCP TLS | 8443/TCP      | InfraNodus MCP | Optional; restrict via source IP allow list |

- Enable `AiProtection → Malicious Sites Blocking` but whitelist `youtube.com`, `googlevideo.com`, `infranodus.com`.

## Monitoring & Alerts
- Enable *Traffic Analyzer → Statistic*; set hourly email summary to NOC alias.  
- Install `amtm` + `connmon` for per-interface bandwidth logs; schedule cron (`cru`) to export `/jffs/scripts/export-traffic`.  
- Configure syslog to remote (Graylog) for audit.

## Failover & Resilience
- Dual-WAN: Configure USB-LTE dongle as secondary; set failover (not load balance).  
- Keep pre-shared Wi-Fi credentials for mobile hotspot fallback (SSID `DoL-Backup`).  
- Document manual switchover: disable WAN → enable USB; confirm NAT; alert production.

## Event-Day Runbook
**T–24 h**  
- Verify firmware, QoS status, `tc` classes active.  
- Run `iperf3` from OBS PC to confirm 190 Mbps sustained.  
- Test MCP access via port 8443.

**Daily 07:30**  
- Reboot router to flush state tables.  
- Run `/jffs/scripts/health-check` to output CPU temp, load, wan status.  
- Confirm `Traffic Analyzer` baseline <1% packet loss.

**During Streams**  
- Monitor WAN utilisation (Adaptive QoS dashboard). Keep <75% uplink.  
- If throughput spikes >180 Mbps for 2 min, enforce `tc class change` to cap guest VLAN.

**Incident Handling**  
- Packet loss >5%: move to backup LTE, pause YouTube ingest, notify production.  
- MCP latency >200 ms: verify port 8443 queue (class 1:20); adjust ceiling to 40 Mbps temporarily.

## Post-Event
- Export configs (`nvram show > /jffs/backups/$(date +%F)-nvram.txt`).  
- Disable LTE failover, revert QoS if not needed.  
- Review logs for anomalies; file incident report within 48 h.
