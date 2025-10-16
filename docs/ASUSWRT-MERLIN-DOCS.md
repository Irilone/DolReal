# Asuswrt-Merlin Documentation

**Source**: [RMerl/asuswrt-merlin.ng Wiki](https://github.com/RMerl/asuswrt-merlin.ng/wiki)
**Compiled**: 2025-10-14
**Target Device**: ASUS RT-AX86U Pro

---

## Table of Contents

1. [Overview](#overview)
2. [Installation Guide](#installation-guide)
3. [User Scripts](#user-scripts)
4. [Frequently Asked Questions](#frequently-asked-questions)
5. [Key Features](#key-features)
6. [DoL 2025 Integration Notes](#dol-2025-integration-notes)

---

## Overview

**Asuswrt-Merlin** is a custom firmware for Asus routers that enhances the stock firmware with advanced features and customization options while maintaining stability and compatibility.

### Project Philosophy

**Priority Order**: `Stability > Performance > Features`

- Community-driven development
- Built on top of Asus's official firmware
- Maintains compatibility with stock features
- Asus-aware and supportive of the project
- Extensive customization without sacrificing reliability

### Key Capabilities

- **Advanced Networking**: OpenVPN, VPN Director, IPv6 tunneling, DNS privacy
- **Customization**: User scripts, JFFS storage, iptables modifications
- **Monitoring**: Traffic analysis, bandwidth monitoring, detailed statistics
- **External Software**: Entware package management, media servers, additional tools
- **Security**: SSH access, DNS-over-TLS, firewall customization

---

## Installation Guide

### Download

**Official Download**: [https://www.asuswrt-merlin.net/download](https://www.asuswrt-merlin.net/download)

### Prerequisites

1. **Check Compatibility**: Verify your router model is supported
2. **Backup Settings**: Export current configuration (if reverting later)
3. **Stable Power**: Ensure uninterrupted power during flash process
4. **Read Release Notes**: Check changelog for your specific model

### Installation Steps

#### 1. Prepare Router

```bash
# Reboot router before flashing (frees up memory)
# Access via web interface: Administration > Reboot
```

#### 2. Enable Downgrade (if coming from stock firmware 3.0.0.6.102_37000)

```bash
# SSH into router and run:
nvram set DOWNGRADE_CHECK_PASS=1
nvram commit
```

#### 3. Flash Firmware

- Navigate to: **Administration > Firmware Upgrade**
- Select downloaded `.trx` or `.w` file
- Click **Upload**
- **DO NOT** interrupt the process
- Router will reboot automatically (3-5 minutes)

#### 4. Factory Reset (Recommended for Major Version Jumps)

**Method 1: Web Interface**
- Administration > Restore/Save/Upload Setting
- Click "Factory Default" button

**Method 2: WPS Button Method**
- Power off router
- Hold WPS button
- Power on router while holding WPS
- Release after 3-5 seconds

**Method 3: Reset Button Method**
- Press and hold Reset button for 5+ seconds
- Power LED will blink
- Release button

#### 5. Initial Configuration

- Access router at: `http://192.168.1.1` or `http://router.asus.com`
- Complete setup wizard
- Configure basic settings (SSID, password, WAN)

### Recovery Mode

If firmware flash fails or router becomes unresponsive:

1. **Enter Recovery Mode**:
   - Turn router OFF
   - Press and HOLD Reset button
   - Turn router ON while holding Reset
   - Wait for power LED to blink slowly
   - Release Reset button

2. **Access Recovery Interface**:
   - Set PC IP to: `192.168.1.2` (subnet: `255.255.255.0`)
   - Browse to: `http://192.168.1.1` or `http://192.168.50.1`
   - Upload firmware via recovery web interface

### Important Warnings

⚠️ **DO NOT restore settings from different firmware versions**
⚠️ **DO NOT use ASUS Firmware Restoration Tool** (use web interface or recovery mode)
⚠️ **ALWAYS reboot before flashing**
⚠️ **Factory reset recommended** for major version jumps

> **Note**: "It is very hard to brick an Asus router" - Most issues can be recovered via Recovery Mode

---

## User Scripts

User scripts enable advanced customization and automation on the router using the JFFS partition for persistent storage.

### Prerequisites

1. **Enable JFFS**:
   - Administration > System > Enable JFFS custom scripts and configs: **YES**
   - Format JFFS partition at next boot: **YES** (first time only)
   - Reboot router

2. **Enable SSH**:
   - Administration > System > Enable SSH: **LAN only** or **LAN + WAN**

### Script Location

All user scripts stored in: `/jffs/scripts/`

### Creating Scripts

#### 1. Basic Script Template

```bash
#!/bin/sh
# Script Name: example-script
# Description: What this script does

logger "Script started: example-script"

# Your custom logic here

logger "Script completed: example-script"
```

#### 2. Make Executable

```bash
# SSH into router
ssh admin@192.168.1.1

# Navigate to scripts directory
cd /jffs/scripts

# Create script
nano my-script

# Make executable
chmod a+rx /jffs/scripts/*
# or for single file:
chmod +x /jffs/scripts/my-script
```

#### 3. Important Requirements

- **Shebang**: Start with `#!/bin/sh`
- **Line Endings**: UNIX format (LF, not CRLF)
- **Permissions**: Must be executable (`chmod +x`)
- **Testing**: Run manually first: `/jffs/scripts/my-script`

### Available Script Hooks

| Hook Name | Trigger Event | Use Case |
|-----------|---------------|----------|
| `services-start` | After system services start | Start custom daemons, mount shares |
| `services-stop` | Before system services stop | Clean shutdown procedures |
| `wan-event` | WAN interface changes | Dynamic DNS updates, VPN triggers |
| `firewall-start` | After firewall rules applied | Custom iptables rules |
| `nat-start` | After NAT rules configured | Port forwarding customization |
| `init-start` | Earliest boot process | Early initialization tasks |
| `pre-mount` | Before partition mounting | Filesystem checks |
| `post-mount` | After partition mounting | Start services on USB drives |
| `dhcpc-event` | DHCP client events | Dynamic configuration |
| `openvpn-event` | OpenVPN state changes | VPN routing adjustments |
| `ddns-start` | After DDNS update attempt | Custom DDNS providers |

### Example Scripts

#### Monitor WAN Connection

```bash
#!/bin/sh
# /jffs/scripts/wan-event

logger "WAN Event: $1 on interface $2"

if [ "$1" = "connected" ]; then
    logger "WAN is UP - running custom tasks"
    # Add your connected logic here
elif [ "$1" = "disconnected" ]; then
    logger "WAN is DOWN - handling disconnect"
    # Add your disconnected logic here
fi
```

#### Custom Firewall Rules

```bash
#!/bin/sh
# /jffs/scripts/firewall-start

logger "Applying custom firewall rules"

# Example: Block specific IP range
iptables -I INPUT -s 192.168.100.0/24 -j DROP

# Example: Allow custom port
iptables -I INPUT -p tcp --dport 8080 -j ACCEPT

logger "Custom firewall rules applied"
```

#### Startup Service

```bash
#!/bin/sh
# /jffs/scripts/services-start

logger "Starting custom services"

# Example: Start custom monitoring script
/jffs/scripts/monitor.sh &

# Example: Mount network share
mount -t cifs //192.168.1.100/share /mnt/share -o user=admin,pass=password

logger "Custom services started"
```

### Debugging Tips

1. **Manual Testing**: Always run scripts manually first
   ```bash
   /jffs/scripts/my-script
   ```

2. **Use Logger**: Add logging statements
   ```bash
   logger "DEBUG: Variable value is $VAR"
   ```

3. **Debug Markers**: Create temporary files
   ```bash
   touch /tmp/000script-executed
   ```

4. **Check Logs**: View system log
   ```bash
   # View log via web interface:
   # System Log > General Log

   # Or via SSH:
   cat /tmp/syslog.log | grep "my-script"
   ```

5. **Error Handling**: Add checks
   ```bash
   if [ -f /jffs/config/myconfig ]; then
       logger "Config found, proceeding"
   else
       logger "ERROR: Config not found"
       exit 1
   fi
   ```

---

## Frequently Asked Questions

### General

**Q: Will flashing Asuswrt-Merlin void my warranty?**
A: According to an Asus CSR statement (2/24/2016): "We will repair the product free of cost under warranty if it does not have any physical damage." However, verify with your regional support.

**Q: Is Asus aware of this project?**
A: Yes, Asus is aware and supportive of the Asuswrt-Merlin project.

**Q: What's the development philosophy?**
A: **Stability > Performance > Features** - The firmware prioritizes rock-solid operation over bleeding-edge features.

### Installation & Recovery

**Q: Can I brick my router?**
A: "It is very hard to brick an Asus router." Most issues can be recovered via Recovery Mode.

**Q: How do I enter Recovery Mode?**
A: Turn router OFF, press and HOLD Reset button, turn ON while holding, wait for blinking LED, release button. Access via `192.168.1.1` or `192.168.50.1`.

**Q: How do I factory reset?**
A:
- **Quick**: Press Reset button for 5+ seconds
- **WPS Method**: Power off, hold WPS button, power on while holding, release after 3-5 seconds
- **Web Interface**: Administration > Restore/Save/Upload > Factory Default

**Q: Should I reset after flashing?**
A: **Yes**, especially for major version jumps. Factory reset prevents configuration conflicts.

### Updates & Features

**Q: Why isn't the latest Asus firmware integrated yet?**
A: Integration requires:
1. Complete source code from Asus
2. Full GPL release
3. Updated components for all supported models
4. Time for thorough testing

**Q: Can I revert to stock firmware?**
A: Yes, flash stock firmware the same way you installed Merlin. Perform factory reset afterward.

---

## Key Features

### Networking

- **OpenVPN Client/Server**: Up to 5 simultaneous VPN connections
- **VPN Director**: Route specific devices through VPN
- **WireGuard Support**: Modern VPN protocol (model-dependent)
- **IPv6 Tunneling**: 6in4, 6rd, 6to4
- **Link Aggregation**: Combine ethernet ports
- **DNS Privacy**: DNS-over-TLS (DoT)
- **DNSFilter**: Per-device DNS control

### Customization

- **JFFS Partition**: Persistent storage for scripts and configs
- **SSH Access**: Full command-line access
- **Custom Scripts**: Extensive hook system
- **Iptables Control**: Advanced firewall customization
- **NVRAM Access**: Low-level router configuration

### Monitoring

- **Traffic Analyzer**: Detailed bandwidth monitoring
- **Per-Device Statistics**: Track individual device usage
- **Real-time Monitoring**: Live traffic graphs
- **Historical Data**: Long-term usage trends

### External Software

- **Entware**: Package manager for additional software
- **Media Servers**: Plex, Transmission, Deluge
- **Chroot Debian**: Full Linux environment
- **Custom Packages**: Install almost any Linux software

### Security

- **DNS-over-TLS**: Encrypted DNS queries
- **AiProtection**: Trend Micro security (if supported by model)
- **VPN Kill Switch**: Block traffic if VPN drops
- **Custom Firewall Rules**: Advanced access control

---

## DoL 2025 Integration Notes

### Router Model

**ASUS RT-AX86U Pro** with Asuswrt-Merlin firmware

### Use Case Requirements

- **4 Simultaneous YouTube Live Streams** (Nodväst, Nodsyd, Nodöst, Nodmidd)
- **OBS Multi-RTMP Streaming**
- **InfraNodus MCP Integration**
- **QoS for Streaming Prioritization**
- **Low-Latency Network Configuration**

### Recommended Configuration

#### 1. QoS Setup for Streaming

```bash
# /jffs/scripts/firewall-start
# Priority: YouTube RTMP traffic

# Mark YouTube streaming traffic
iptables -t mangle -A PREROUTING -p tcp --dport 1935 -j MARK --set-mark 1

# Priority queue for marked packets
tc qdisc add dev eth0 root handle 1: htb default 10
tc class add dev eth0 parent 1: classid 1:1 htb rate 1000mbit
tc class add dev eth0 parent 1:1 classid 1:10 htb rate 950mbit prio 1
tc filter add dev eth0 parent 1: protocol ip prio 1 handle 1 fw flowid 1:10
```

#### 2. YouTube Concurrency Policy

**Limit**: ≤12 simultaneous events per channel
**DoL 2025 Usage**: 4 events (within limits)

#### 3. Port Forwarding for OBS

- **RTMP**: TCP 1935
- **RTMPS**: TCP 443
- **Custom Ports**: As configured in OBS

#### 4. DNS Configuration

```bash
# Use Cloudflare DNS for low latency
# WAN > Internet Connection > DNS Server
Primary: 1.1.1.1
Secondary: 1.0.0.1

# Enable DNS-over-TLS
# WAN > Internet Connection > DNS Privacy Protocol: DNS-over-TLS (DoT)
```

#### 5. Network Monitoring

Enable Traffic Analyzer:
- Tools > Traffic Analyzer
- Monitor real-time bandwidth per stream
- Set alerts for bandwidth thresholds

#### 6. Backup Script

```bash
#!/bin/sh
# /jffs/scripts/backup-config
# Backup router configuration daily

DATE=$(date +%Y%m%d)
BACKUP_DIR="/mnt/usb/router-backups"

mkdir -p $BACKUP_DIR

# Export settings
nvram show > "$BACKUP_DIR/nvram-backup-$DATE.txt"

# Copy custom scripts
tar czf "$BACKUP_DIR/scripts-backup-$DATE.tar.gz" /jffs/scripts/

logger "Router configuration backed up to $BACKUP_DIR"
```

#### 7. Scheduled Tasks

```bash
# /jffs/scripts/services-start
# Add cron job for daily backup

cru a BackupConfig "0 3 * * * /jffs/scripts/backup-config"
```

### Performance Optimization

1. **Disable Unused Services**:
   - Turn off AiCloud if not used
   - Disable USB applications if not needed
   - Turn off IPv6 if not required

2. **Optimize WiFi**:
   - Use separate SSIDs for 2.4GHz and 5GHz
   - Set optimal channel width (40MHz for 2.4GHz, 80MHz for 5GHz)
   - Enable Beamforming
   - Use WPA3 if all devices support it

3. **Wired Connections**:
   - Use ethernet for streaming devices (OBS computers)
   - Enable Jumbo Frames if network supports it
   - Disable WAN aggregation unless needed

### Troubleshooting Checklist

- [ ] Verify firmware version matches documentation
- [ ] Check JFFS is enabled and formatted
- [ ] Ensure SSH is accessible
- [ ] Test custom scripts manually before production
- [ ] Monitor router temperature during high load
- [ ] Backup configuration before making changes
- [ ] Document all custom rules and scripts
- [ ] Test failover scenarios (WAN disconnect, power loss)

---

## Additional Resources

- **Official Website**: [https://www.asuswrt-merlin.net](https://www.asuswrt-merlin.net)
- **GitHub Repository**: [https://github.com/RMerl/asuswrt-merlin.ng](https://github.com/RMerl/asuswrt-merlin.ng)
- **Wiki**: [https://github.com/RMerl/asuswrt-merlin.ng/wiki](https://github.com/RMerl/asuswrt-merlin.ng/wiki)
- **Community Forums**: [https://www.snbforums.com/forums/asuswrt-merlin.42/](https://www.snbforums.com/forums/asuswrt-merlin.42/)
- **Downloads**: [https://www.asuswrt-merlin.net/download](https://www.asuswrt-merlin.net/download)

---

**Document Status**: Based on available wiki content as of 2025-10-14. Some sections may require direct wiki consultation for latest updates.
