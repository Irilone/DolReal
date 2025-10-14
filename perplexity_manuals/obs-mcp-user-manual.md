# Comprehensive User Manual: OBS Studio with MCP Server Integration

## Table of Contents
1. [Introduction](#introduction)
2. [OBS Studio MCP Server Overview](#obs-studio-mcp-server-overview)
3. [System Requirements](#system-requirements)
4. [Installation and Setup](#installation-and-setup)
5. [Configuration](#configuration)
6. [Core Features and Usage](#core-features-and-usage)
7. [YouTube Live Streaming Integration](#youtube-live-streaming-integration)
8. [Advanced Multi-Channel Streaming](#advanced-multi-channel-streaming)
9. [Conference Digital Infrastructure](#conference-digital-infrastructure)
10. [Troubleshooting](#troubleshooting)
11. [Best Practices](#best-practices)

## Introduction

The OBS Studio MCP (Model Context Protocol) Server represents a revolutionary advancement in live streaming technology, enabling AI-powered control and automation of OBS Studio through standardized protocols. This integration allows for seamless interaction between AI assistants (like Claude) and OBS Studio, facilitating automated scene management, source control, and streaming operations.

## OBS Studio MCP Server Overview

### What is the OBS MCP Server?

The OBS MCP Server is a Node.js-based application that provides tools to control OBS Studio via the OBS WebSocket protocol. It acts as a bridge between AI systems and OBS Studio, enabling:

- **General Operations**: Version info, statistics, hotkey management, studio mode control
- **Scene Management**: List, switch, create, and remove scenes
- **Source Control**: Manage sources, settings, audio levels, mute/unmute functions  
- **Scene Item Manipulation**: Position, visibility, and property management
- **Streaming & Recording Control**: Start/stop streaming, recording, virtual camera
- **Transition Management**: Set transitions, durations, trigger effects

### Key Benefits

1. **AI-Powered Automation**: Control OBS through natural language commands
2. **Standardized Integration**: Uses MCP protocol for consistent API interactions
3. **Real-time Control**: Immediate response to commands and status updates
4. **Multi-platform Support**: Compatible with Claude Desktop, Cursor IDE, and other MCP clients

## System Requirements

### Hardware Requirements
- **CPU**: Intel i5-6000 series or AMD Ryzen 5 2600 equivalent (minimum)
- **RAM**: 8GB minimum, 16GB recommended for multiple streams
- **GPU**: Dedicated graphics card recommended for encoding
- **Storage**: 500MB available space for OBS Studio and MCP server
- **Network**: Stable internet connection with upload speeds matching stream requirements

### Software Requirements
- **Operating System**: Windows 10/11, macOS 10.15+, or Linux (Ubuntu 18.04+)
- **OBS Studio**: Version 31.0 or later with WebSocket server support
- **Node.js**: Version 16.0 or later
- **AI Client**: Claude Desktop, Cursor IDE, or compatible MCP client

## Installation and Setup

### Step 1: Install OBS Studio

1. Download OBS Studio from the official website: https://obsproject.com/
2. Install using the appropriate installer for your operating system
3. Launch OBS Studio and complete the initial setup wizard

### Step 2: Enable WebSocket Server in OBS

1. Open OBS Studio
2. Navigate to **Tools > WebSocket Server Settings**
3. Check **Enable WebSocket server**
4. Set a secure password (required for MCP server connection)
5. Note the server port (default: 4455)
6. Click **OK** to save settings

### Step 3: Install OBS MCP Server

#### Option A: Using NPM (Recommended)
```bash
# Install globally
npm install -g obs-mcp@latest

# Or install locally in project directory
npm install obs-mcp@latest
```

#### Option B: From Source
```bash
# Clone the repository
git clone https://github.com/royshil/obs-mcp.git
cd obs-mcp

# Install dependencies
npm install

# Build the project
npm run build
```

### Step 4: Configure Environment Variables

Set the WebSocket password in your environment:

**Windows:**
```cmd
set OBS_WEBSOCKET_PASSWORD=your_password_here
```

**macOS/Linux:**
```bash
export OBS_WEBSOCKET_PASSWORD="your_password_here"
```

## Configuration

### Claude Desktop Configuration

Edit the Claude Desktop configuration file:

**macOS Location:**
```
~/Library/Application Support/Claude/claude_desktop_config.json
```

**Windows Location:**
```
%APPDATA%\Claude\claude_desktop_config.json
```

**Configuration Content:**
```json
{
  "mcpServers": {
    "obs": {
      "command": "npx",
      "args": ["-y", "obs-mcp@latest"],
      "env": {
        "OBS_WEBSOCKET_PASSWORD": "your_password_here",
        "OBS_WEBSOCKET_URL": "ws://localhost:4455"
      }
    }
  }
}
```

### Local Development Configuration

For local development installations:
```json
{
  "mcpServers": {
    "obs": {
      "command": "node",
      "args": ["/path/to/obs-mcp/build/index.js"],
      "env": {
        "OBS_WEBSOCKET_PASSWORD": "your_password_here",
        "OBS_WEBSOCKET_URL": "ws://localhost:4455"
      }
    }
  }
}
```

### Cursor IDE Configuration

1. Open Cursor IDE
2. Navigate to **Settings → Tools & Integrations**
3. Click **New MCP Server**
4. Add the configuration:
```json
{
  "mcpServers": {
    "obs": {
      "command": "node",
      "args": ["/path/to/obs-mcp/build/index.js"],
      "env": {
        "OBS_WEBSOCKET_PASSWORD": "your_password_here"
      }
    }
  }
}
```

## Core Features and Usage

### Basic AI Commands

Once configured, you can control OBS using natural language commands in your AI client:

#### Scene Management
- "Switch to the 'Gaming' scene"
- "Create a new scene called 'Interview Setup'"
- "List all available scenes"
- "Delete the 'Unused Scene'"

#### Source Control  
- "Add a new webcam source"
- "Mute the microphone"
- "Adjust the volume of 'Desktop Audio' to 75%"
- "Hide the 'Overlay' source"

#### Streaming Operations
- "Start streaming to YouTube"
- "Stop the current stream"
- "Begin recording"
- "Enable the virtual camera"

#### Advanced Controls
- "Switch to Studio Mode"
- "Set transition duration to 500ms"
- "Trigger a fade transition"
- "Get current stream statistics"

### Available Tool Categories

#### General Tools
- **obs-get-version**: Retrieve OBS Studio version information
- **obs-get-stats**: Get streaming statistics and performance metrics
- **obs-trigger-hotkey**: Execute configured hotkeys programmatically
- **obs-toggle-studio-mode**: Enable/disable Studio Mode

#### Scene Tools  
- **obs-get-scene-list**: List all configured scenes
- **obs-set-current-scene**: Switch to specified scene
- **obs-create-scene**: Create new scene with given name
- **obs-remove-scene**: Delete specified scene

#### Source Tools
- **obs-get-source-list**: List all configured sources
- **obs-toggle-source-mute**: Mute/unmute audio sources
- **obs-set-source-volume**: Adjust source audio levels
- **obs-get-source-settings**: Retrieve source configuration

#### Streaming Tools
- **obs-start-stream**: Begin live streaming
- **obs-stop-stream**: End current stream
- **obs-start-record**: Start recording
- **obs-stop-record**: Stop recording
- **obs-start-virtual-cam**: Enable virtual camera output

## YouTube Live Streaming Integration

### Setting Up YouTube Live Streaming

#### Prerequisites
1. YouTube account with live streaming enabled
2. Verified phone number on YouTube account
3. No live streaming restrictions in past 90 days

#### Enabling Live Streaming
1. Sign in to YouTube Studio
2. Click **Go Live** in the top-right corner
3. If first time: Request access and wait up to 24 hours for activation
4. Complete phone verification if prompted

### OBS YouTube Integration

#### Method 1: Account Connection (Recommended)
1. Open OBS Studio
2. Go to **Settings > Stream**
3. Select **YouTube - RTMPS** as service
4. Click **Connect Account (recommended)**
5. Authorize OBS in browser
6. Return to OBS and verify connection

#### Method 2: Stream Key Method
1. In YouTube Studio, click **Go Live**
2. Select **Streaming software** option
3. Copy the **Stream Key**
4. In OBS: **Settings > Stream**
5. Select **YouTube - RTMPS**
6. Choose **Use Stream Key**
7. Paste the stream key

### Creating Multiple YouTube Streams

For conference setups requiring multiple simultaneous streams:

#### Creating Stream Events
1. In YouTube Studio, navigate to **Content > Live**
2. Click **Schedule stream** 
3. Configure each stream:
   - **Title**: Use conference node names (Nodväst, Nodsyd, Nodöst, Nodmidd)
   - **Description**: Include conference details
   - **Visibility**: Set to Public or Unlisted as needed
   - **Category**: Select appropriate category
4. Generate unique stream keys for each event

#### Multi-Instance OBS Setup
1. Create separate OBS installations for each stream:
```bash
# Create directory for each instance
mkdir OBS_Nodvast OBS_Nodsyd OBS_Nodost OBS_Nodmidd

# Copy OBS files to each directory
# Configure each instance with unique stream keys
```

2. Configure each instance:
   - Unique stream key for each YouTube event
   - Appropriate encoder settings for available bandwidth
   - Distinct source configurations

## Advanced Multi-Channel Streaming

### Infrastructure Requirements

#### Network Bandwidth Calculation
For multiple HD streams (1080p30):
- **Per stream**: 5-8 Mbps upload
- **Four streams**: 20-32 Mbps total upload required
- **Recommended**: 40+ Mbps upload for reliability

#### Hardware Specifications
- **CPU**: Intel i7-9700K or AMD Ryzen 7 3700X (minimum for 4 streams)
- **RAM**: 32GB for simultaneous multi-stream encoding
- **GPU**: NVIDIA RTX 3060 or better for hardware encoding
- **Network**: Gigabit ethernet connection (no WiFi)

### Automated Stream Management

Using the MCP server for centralized control:

```python
# Example automation script for conference day 2
# (Nodväst only - disable other streams)

def configure_day_2_streaming():
    # Disable secondary nodes
    disable_stream("Nodsyd")
    disable_stream("Nodöst") 
    disable_stream("Nodmidd")
    
    # Ensure primary node is active
    enable_stream("Nodväst")
    
    # Update UI configurations
    update_website_ui(active_streams=["Nodväst"])
```

### Load Balancing and Redundancy

#### Primary-Secondary Setup
1. **Primary Encoder**: Main streaming system
2. **Secondary Encoder**: Backup system on standby
3. **Automatic Failover**: Monitor primary and switch if needed

#### Stream Health Monitoring
- Real-time bitrate monitoring
- Connection stability checks
- Automatic quality adjustment
- Alert systems for technical issues

## Conference Digital Infrastructure

### Complete Conference Streaming Setup

#### Pre-Event Preparation

**1. Account Setup**
- YouTube Account: `Dagar.om.lagar@gmail.com`
- Channel: SFMI
- Verify streaming permissions and limits

**2. Stream Configuration**
Create scheduled streams for:
- **Nodväst - DoL 2025** (Primary/Hub)
- **Nodsyd - DoL 2025** 
- **Nodöst - DoL 2025**
- **Nodmidd - DoL 2025**

**3. Technical Infrastructure**
- Dedicated streaming computers for each node
- Reliable network connections
- Backup internet connections
- Audio/video equipment per location

#### Day 1: Multi-Node Streaming

**Network Architecture:**
```
Internet → Main Router → Switch
                       ├── Node Väst (Primary)
                       ├── Node Syd
                       ├── Node Öst  
                       └── Node Midd
```

**Bandwidth Allocation:**
- Total required: 32 Mbps upload
- Per node: 8 Mbps allocated
- Reserve: 8 Mbps for overhead/backup

#### Day 2: Single-Node Operation

**Automated Transition:**
1. Maintain Nodväst stream active
2. Gracefully end other streams
3. Keep website UI unchanged
4. Redirect all traffic to primary node

### Equipment Checklist

#### Per Streaming Node
- [ ] Computer meeting hardware requirements
- [ ] OBS Studio installed and configured
- [ ] OBS MCP Server setup
- [ ] Dedicated ethernet connection
- [ ] Professional camera setup
- [ ] Audio interface and microphones
- [ ] Adequate lighting equipment
- [ ] Backup power supply (UPS)

#### Central Control
- [ ] Master control station
- [ ] Network monitoring tools
- [ ] Stream health dashboards
- [ ] Communication system between nodes
- [ ] Technical support team assignments

### Network Configuration

#### Quality of Service (QoS) Setup
```
Priority 1: Streaming traffic (highest)
Priority 2: Audio/communication
Priority 3: Control/monitoring
Priority 4: Other traffic (lowest)
```

#### Firewall Configuration
Required ports:
- **OBS WebSocket**: 4455 (internal)
- **RTMPS YouTube**: 443 (outbound)
- **Monitoring**: Custom ports as needed

## Troubleshooting

### Common Issues and Solutions

#### MCP Server Connection Issues

**Problem**: Claude can't connect to OBS MCP server
**Solutions**:
1. Verify OBS WebSocket server is enabled
2. Check password matches in configuration
3. Ensure OBS is running before starting MCP client
4. Restart Claude Desktop after configuration changes

#### Stream Connection Problems

**Problem**: Unable to connect to YouTube
**Solutions**:
1. Verify stream key is current and correct
2. Check internet connection stability
3. Confirm YouTube account has streaming enabled
4. Try regenerating stream key in YouTube Studio

#### Performance Issues  

**Problem**: Dropped frames or poor quality
**Solutions**:
1. Reduce encoder settings (bitrate, resolution)
2. Close unnecessary applications
3. Check CPU/GPU utilization
4. Verify sufficient upload bandwidth

#### Multi-Stream Conflicts

**Problem**: Streams interfering with each other
**Solutions**:
1. Ensure each OBS instance uses unique configurations
2. Verify adequate bandwidth allocation
3. Check for hardware resource conflicts
4. Implement proper stream scheduling

### Diagnostic Commands

Use these AI commands to troubleshoot:
- "Get OBS version and system information"
- "Show current stream statistics"
- "List all active sources and scenes"
- "Check WebSocket connection status"
- "Display encoder settings and performance"

### Log Analysis

#### OBS Logs Location
**Windows**: `%APPDATA%\obs-studio\logs\`
**macOS**: `~/Library/Application Support/obs-studio/logs/`
**Linux**: `~/.config/obs-studio/logs/`

#### Key Log Indicators
- Connection timeout errors
- Encoding overload warnings  
- Network stability issues
- Audio/video synchronization problems

## Best Practices

### Pre-Stream Checklist

#### Technical Preparation
- [ ] Test all equipment 48 hours before event
- [ ] Verify internet upload speeds at each location
- [ ] Configure and test all OBS scenes
- [ ] Set up MCP server connections
- [ ] Create backup configurations
- [ ] Schedule YouTube live events
- [ ] Test stream keys and connections

#### Content Preparation  
- [ ] Prepare intro/outro sequences
- [ ] Set up lower thirds and overlays
- [ ] Configure audio levels and mixing
- [ ] Test all transitions and effects
- [ ] Prepare backup content/slides

### During the Stream

#### Monitoring
- Continuous bandwidth monitoring
- Stream health dashboard observation
- Chat moderation and interaction
- Technical issue rapid response
- Backup system readiness

#### Quality Control
- Regular audio level checks
- Visual quality monitoring  
- Transition timing verification
- Source switching validation
- Recording backup confirmation

### Post-Stream Operations

#### Immediate Actions
- Stop all active streams properly
- Save and backup recordings
- Archive stream configurations
- Document any technical issues
- Gather feedback from operators

#### Analysis and Improvement
- Review stream analytics and metrics
- Analyze viewer engagement data
- Identify technical improvement areas
- Update documentation and procedures
- Plan equipment upgrades if needed

### Security Considerations

#### Access Control
- Secure WebSocket passwords
- Limit MCP server access
- Use VPN for remote management
- Implement operator authentication
- Regular password updates

#### Data Protection
- Secure stream key management
- Encrypted communication channels
- Backup data protection
- Privacy compliance measures
- Incident response procedures

---

This manual provides comprehensive guidance for implementing OBS Studio with MCP server integration for professional conference streaming operations. The combination of AI-powered control and robust streaming infrastructure ensures reliable, high-quality live streaming experiences.