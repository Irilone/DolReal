# Integrated System Guide: Router + OBS + YouTube

## Overview
This guide provides a complete walkthrough for setting up the streaming infrastructure for the Dagar om Lagar 2025 event. This includes configuring the network router, setting up OBS Studio for multi-platform streaming, and creating the necessary YouTube Live events.

## Hardware Requirements

*   **Router:** ASUS RT-AX86U Pro
*   **Internet:** Fiber connection with a minimum of 100 Mbps upload speed to support 4x 1080p streams.
*   **OBS PC:** A dedicated computer for running OBS Studio is recommended, with at least 16GB of RAM and an 8-core CPU.

## Router Configuration (Asuswrt-Merlin)

### Quality of Service (QoS) Settings

To ensure a stable stream, it is crucial to prioritize streaming traffic on your network. This can be done using the QoS settings on your ASUS router.

1.  Log in to your router's web interface.
2.  Navigate to the **Adaptive QoS** section.
3.  Enable **Adaptive QoS**.
4.  Prioritize the following traffic:
    *   **RTMP (Port 1935):** Set to **Highest** priority.
    *   **HTTPS (Port 443):** Set to **High** priority.
5.  Set bandwidth allocation:
    *   **Upload:** Reserve at least 80 Mbps for streaming.
    *   **Download:** Reserve at least 20 Mbps for control and other network activities.

### Port Forwarding

To allow OBS to send the stream to the public internet, you need to configure port forwarding on your router.

| Service | Port | Protocol | Internal IP Address |
| --- | --- | --- | --- |
| RTMP | 1935 | TCP | *IP address of your OBS PC* |

## OBS Configuration

### Multi-RTMP Setup

To stream to four YouTube channels simultaneously, you will need to use the OBS Multi-RTMP plugin.

1.  **Download the plugin:** Download the latest release of the OBS Multi-RTMP plugin from its GitHub page.
2.  **Install the plugin:**
    *   **Windows:** Use the provided installer.
    *   **macOS/Linux:** Extract the downloaded archive and copy the `obs-plugins` and `data` folders to your OBS Studio installation directory.
3.  **Configure the outputs:**
    *   In OBS Studio, go to **Docks > Multiple Output**.
    *   Click **Add new target** for each of the four streams.
    *   For each target, enter the following information:
        *   **Name:** A descriptive name for the stream (e.g., "Nodväst").
        *   **RTMP Server:** `rtmps://a.rtmp.youtube.com/live2`
        *   **RTMP Key:** The stream key for the corresponding YouTube channel.

### Performance Settings

To ensure a high-quality stream without overloading your computer, use the following settings in OBS Studio:

*   **Encoder:**
    *   If you have a modern NVIDIA GPU, use **NVENC H.264**.
    *   Otherwise, use **x264**.
*   **Rate Control:** CBR (Constant Bitrate)
*   **Bitrate:** 6000 Kbps per stream (for 1080p at 30fps). Adjust as needed based on your internet connection and the requirements of the streaming platform.
*   **Keyframe Interval:** 2 seconds
*   **Preset:** Quality

### MCP Server (Remote Control)

To control OBS remotely, you can use an MCP (Multi-Control Panel) server. This is done by enabling the OBS WebSocket server.

1.  In OBS Studio, go to **Tools > WebSocket Server Settings**.
2.  Enable the WebSocket server.
3.  Set a password for the server to secure the connection.
4.  You can now use any MCP client that supports the OBS WebSocket protocol to control OBS remotely. This is useful for automating scene switches, starting/stopping streams, and other tasks.

## YouTube Live Events

### Event Creation

Before the event, you need to create the four scheduled live streams on YouTube.

1.  Go to the **YouTube Studio** for each of the four channels.
2.  Click **Go Live**.
3.  Create a new **Scheduled stream** for each channel, with the correct date and time (November 6, 2025).
4.  For each stream, copy the **stream key**. You will need this for the OBS Multi-RTMP plugin.
5.  Enable the following options for each stream:
    *   **Enable DVR:** This allows viewers to pause and rewind the stream.
    *   **Live chat:** This enables viewers to interact with each other.
    *   **Auto-start:** This will automatically start the stream when OBS starts sending data.

### Concurrent Stream Policy

YouTube's terms of service allow for up to 12 concurrent live streams per channel. Since this project only uses four streams, it is well within the limit.

## Troubleshooting

*   **Dropped frames:** If you are experiencing dropped frames in OBS, try lowering the bitrate or the resolution of your stream. You can also try using a different encoder.
*   **Connection issues:** If you are having trouble connecting to the RTMP server, double-check your stream key and the server URL. Also, make sure that your firewall is not blocking the connection.
*   **High CPU usage:** If your CPU usage is too high, try using a more efficient encoder (like NVENC) or lowering the quality preset.
