# ASUS RT-AX86U Pro QoS Configuration Plan

## Objective
Configure ASUS RT-AX86U Pro router (Asuswrt-Merlin firmware) to prioritize 4 concurrent 4K RTMP streams (100Mbps total) over 1000Mbps fiber connection.

## Hardware & Network Context
- **Router**: ASUS RT-AX86U Pro (WiFi 6, AX5700)
- **Firmware**: Asuswrt-Merlin 388.x or later
- **WAN**: 1000Mbps fiber connection
- **RTMP Traffic**: 4 streams × 25Mbps = 100Mbps total
- **Ports**: RTMP default port 1935

## Configuration Steps

### 1. Access Router Admin Panel
- Navigate to `http://192.168.1.1` or router IP
- Login with admin credentials
- Verify Asuswrt-Merlin firmware version

### 2. Enable QoS (Quality of Service)
```
QoS → QoS Type → Traditional QoS
```
- Set **Upload Bandwidth**: 950 Mbps (95% of 1000Mbps)
- Set **Download Bandwidth**: 950 Mbps
- Enable **QoS** toggle

### 3. Create Custom RTMP Rule
```
QoS → User-defined QoS rules
```
Add new rule:
- **Service Name**: RTMP Streaming
- **Source IP**: [OBS machine IP - e.g., 192.168.1.100]
- **Destination Port**: 1935
- **Protocol**: TCP
- **Priority**: Highest
- **Transferred**: > 100000 KB (100MB threshold)

### 4. Apply Bandwidth Priority
```
QoS → QoS Priority
```
Priority order (highest to lowest):
1. RTMP Streaming (custom rule)
2. VOIP/Video Conferencing
3. Web Surfing
4. File Transfers
5. P2P Downloads

### 5. Enable Adaptive QoS (Optional)
```
Adaptive QoS → Enable
```
- **QoS Type**: Adaptive QoS
- **Mode**: Media Streaming
- Prioritize streaming devices by MAC address

## Verification Steps

### Test 1: Bandwidth Allocation
```bash
# From OBS machine, test upload while streaming
iperf3 -c speedtest.server.com -p 5201 -t 60
```
Expected: Consistent 25Mbps per stream with <1% packet loss

### Test 2: Port Monitoring
```bash
# Monitor RTMP port traffic
tcpdump -i eth0 port 1935 -c 100
```

### Test 3: Router Traffic Analyzer
- Navigate to **Traffic Analyzer** in router admin
- Verify RTMP traffic shows in "Highest Priority" category
- Monitor real-time bandwidth graphs during streaming

## Troubleshooting

### Issue: QoS Not Affecting Gigabit WAN
**Cause**: Traditional QoS has limited effect on 1Gbps connections
**Solution**: 
- Use Adaptive QoS instead
- Enable **Bandwidth Limiter** for non-critical devices
- Set manual upload rate to 800Mbps to force QoS engagement

### Issue: RTMP Traffic Not Prioritized
**Check**:
1. Verify source IP matches OBS machine
2. Confirm port 1935 is open (not blocked by firewall)
3. Check QoS statistics page for rule hits

### Issue: Stream Dropping Despite QoS
**Actions**:
1. Reduce other devices' bandwidth limits
2. Enable **WMM** (WiFi Multimedia) for wireless devices
3. Use wired connection for OBS machine
4. Test with single stream first, then scale to 4

## Critical Limitations

⚠️ **QoS Effectiveness**: Research indicates traditional QoS has minimal impact on gigabit connections since 100Mbps RTMP traffic is only 10% of total bandwidth. QoS is most effective when link is congested (>70% utilization).

**Recommendation**: 
- Rely on excess bandwidth capacity rather than QoS alone
- Implement application-level monitoring (OBS stats)
- Use dedicated VLAN for streaming devices if possible

## Related Documentation
- [Asuswrt-Merlin QoS Guide](https://github.com/RMerl/asuswrt-merlin.ng/wiki/QOS)
- ASUS RT-AX86U Pro User Manual (Section 4.5 - QoS)
- RTMP Specification: Port 1935, TCP protocol

## Success Criteria
- [ ] All 4 RTMP streams maintain 25Mbps upload consistently
- [ ] Packet loss <0.5% during 2-hour streaming window
- [ ] No dropped frames in OBS (skipped <0.1%)
- [ ] Router CPU usage <60% during streaming
- [ ] Other devices maintain acceptable speeds (>100Mbps)
