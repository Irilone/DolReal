# Comprehensive User Manual: InfraNodus with MCP Server Integration

## Table of Contents
1. [Introduction](#introduction)
2. [InfraNodus MCP Server Overview](#infranodus-mcp-server-overview)
3. [System Requirements](#system-requirements)
4. [Installation and Setup](#installation-and-setup)
5. [Configuration](#configuration)
6. [Core Features and Usage](#core-features-and-usage)
7. [Knowledge Graph Analysis](#knowledge-graph-analysis)
8. [Conference Content Analysis](#conference-content-analysis)
9. [Integration with YouTube Streaming](#integration-with-youtube-streaming)
10. [Troubleshooting](#troubleshooting)
11. [Best Practices](#best-practices)

## Introduction

InfraNodus MCP Server revolutionizes text analysis and knowledge extraction by integrating advanced network science algorithms with AI workflows. This powerful combination enables real-time knowledge graph generation, content gap analysis, and topical clustering through natural language interactions with AI assistants like Claude.

## InfraNodus MCP Server Overview

### What is InfraNodus?

InfraNodus is an AI-powered network analysis platform that transforms unstructured text into structured insights using graph theory and network analysis. The MCP server integration provides:

- **Knowledge Graph Generation**: Convert any text into visual knowledge graphs
- **Network Analysis**: Apply advanced algorithms to identify patterns and relationships
- **Content Gap Detection**: Discover missing connections in discourse
- **Topical Clustering**: Identify main themes and sub-topics
- **Research Question Generation**: Create targeted research queries
- **Comparative Analysis**: Compare multiple texts and find overlaps/differences

### Key Benefits

1. **AI-Enhanced Analysis**: Combines AI language models with network science
2. **Real-time Processing**: Instant knowledge graph generation from text
3. **Multi-modal Integration**: Works with various text sources and formats
4. **Standardized Protocol**: Uses MCP for seamless AI integration
5. **Privacy-Focused**: Optional data saving with doNotSave parameter

## System Requirements

### Hardware Requirements
- **CPU**: Modern multi-core processor (Intel i5 or AMD Ryzen 5 equivalent)
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 100MB for local installation
- **Network**: Stable internet connection for API access

### Software Requirements
- **Node.js**: Version 16.0 or later (for local installation)
- **AI Client**: Claude Desktop, Cursor IDE, or compatible MCP client
- **Browser**: Modern browser for web-based configuration
- **InfraNodus Account**: Free or premium account for API access

## Installation and Setup

### Method 1: Remote Installation via Smithery (Recommended)

#### For Claude Desktop
1. Visit the Smithery MCP Server page
2. Select "Claude" and click install
3. Restart Claude Desktop
4. InfraNodus tools will appear in your chat interface

#### For Cursor IDE  
1. Go to InfraNodus MCP server page on Smithery
2. Choose "Cursor" in "Add Your Own Client" > Auto menu
3. Smithery will open Cursor and offer to add the server
4. Give it a short name (e.g., "InfraNodus")
5. Click "Connect"

#### For Claude Web
1. Open Claude Web Connectors page
2. Click "Add Custom Connector"
3. Add this URL: `https://server.smithery.ai/@infranodus/mcp-server-infranodus/mcp`
4. Give it a name (e.g., "InfraNodus")
5. Click "Connect" and complete authentication

### Method 2: Local Installation

#### Step 1: Clone and Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/mcp-server-infranodus.git
cd mcp-server-infranodus

# Install dependencies
npm install

# Build the project
npm run build
```

#### Step 2: Configure API Key
Create a `.env` file in the project root:
```
INFRANODUS_API_KEY=your-api-key-here
```

#### Step 3: Test Installation
```bash
# Inspect the MCP server
npm run inspect
```

### Obtaining InfraNodus API Key

1. Create account at https://infranodus.com
2. Navigate to your user account settings
3. Go to API section
4. Click "Create new key"
5. Copy the generated API key

**Note**: Free accounts have rate limits. Advanced, Pro, and Premium subscribers get higher usage limits.

## Configuration

### Claude Desktop Configuration

**macOS:**
```bash
open ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

**Windows:**
```bash
%APPDATA%\Claude\claude_desktop_config.json
```

#### Remote Configuration (Smithery)
```json
{
  "mcpServers": {
    "infranodus": {
      "command": "npx",
      "args": [
        "-y",
        "@smithery/cli@latest", 
        "run",
        "@infranodus/mcp-server-infranodus",
        "--key",
        "YOUR_SMITHERY_API_KEY",
        "--profile", 
        "YOUR_SMITHERY_PROFILE_NAME"
      ]
    }
  }
}
```

#### Local Configuration
```json
{
  "mcpServers": {
    "infranodus": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-server-infranodus/dist/index.js"],
      "env": {
        "INFRANODUS_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

### Cursor IDE Configuration

Navigate to **Settings → Cursor Settings → Tools & MCP**:

```json
{
  "mcpServers": {
    "InfraNodus": {
      "type": "http",
      "url": "https://server.smithery.ai/@infranodus/mcp-server-infranodus/mcp?api_key=YOUR_SMITHERY_API_KEY&profile=YOUR_SMITHERY_PROFILE_NAME",
      "headers": {}
    }
  }
}
```

### VSCode Configuration

For VSCode with MCP extensions, use similar configuration as Cursor IDE.

## Core Features and Usage

### Available Tools Overview

#### 1. generate_knowledge_graph
**Purpose**: Convert any text into a visual knowledge graph
**Usage**: "Generate a knowledge graph from this conference agenda"
**Output**: Interactive graph showing concepts and relationships

#### 2. analyze_existing_graph_by_name  
**Purpose**: Retrieve and analyze existing graphs from your account
**Usage**: "Analyze my graph named 'DoL 2025 Conference'"
**Output**: Detailed analysis with statistics and insights

#### 3. generate_content_gaps
**Purpose**: Detect missing connections in discourse  
**Usage**: "Find content gaps in this research proposal"
**Output**: Identified gaps and improvement suggestions

#### 4. generate_topical_clusters
**Purpose**: Generate topics and clusters of keywords from text
**Usage**: "Show me the main topical clusters in these speaker abstracts"
**Output**: Organized clusters with topic naming

#### 5. generate_research_questions
**Purpose**: Generate research questions that bridge content gaps
**Usage**: "Create research questions for conference planning"
**Output**: Targeted questions for further investigation

#### 6. generate_research_questions_from_graph
**Purpose**: Generate questions based on existing graph
**Usage**: "What research questions emerge from my conference graph?"
**Output**: Graph-informed research directions

#### 7. generate_responses_from_graph
**Purpose**: Generate responses based on existing graph
**Usage**: "Generate speaker recommendations from this topic graph"
**Output**: AI-generated responses using graph context

#### 8. generate_text_overview
**Purpose**: Generate topical overview and insights
**Usage**: "Provide an overview of this conference program"
**Output**: High-level summary with key themes

#### 9. create_knowledge_graph  
**Purpose**: Create persistent graph in InfraNodus
**Usage**: "Create a permanent graph for DoL 2025 planning"
**Output**: Graph created with shareable link

#### 10. generate_overlap_graph
**Purpose**: Find similarities between multiple texts
**Usage**: "Compare abstracts from different conference tracks"
**Output**: Overlapping concepts and themes

#### 11. generate_difference_graph
**Purpose**: Find differences between texts
**Usage**: "What topics are missing from track A compared to track B?"
**Output**: Unique concepts and gaps

#### 12. generate_google_search_graph
**Purpose**: Analyze Google search results for keywords
**Usage**: "What do search results show for 'digital transformation'?"
**Output**: Graph of current information landscape

#### 13. generate_search_queries_graph
**Purpose**: Analyze Google suggested searches
**Usage**: "What are people searching for related to 'AI conferences'?"
**Output**: Demand-side information analysis

#### 14. generate_search_results_vs_queries_graph
**Purpose**: Find gaps between search demand and supply
**Usage**: "What conference topics do people search for but don't find?"
**Output**: Market opportunity analysis

#### 15. search
**Purpose**: Search through existing InfraNodus graphs
**Usage**: "Find graphs related to 'digital infrastructure'"
**Output**: Relevant graphs from your account or public graphs

#### 16. fetch
**Purpose**: Retrieve specific graph data
**Usage**: "Fetch details for graph ID 12345"
**Output**: Complete graph data and analysis

## Knowledge Graph Analysis

### Basic Text Analysis

#### Single Document Analysis
```
Command: "Generate a knowledge graph from this conference program"
Process:
1. Text preprocessing and entity extraction
2. Relationship identification
3. Network topology analysis
4. Cluster detection
5. Visual graph generation
```

#### Multi-Document Comparison
```
Command: "Compare these three speaker abstracts"
Process:
1. Individual graph generation
2. Overlap analysis
3. Difference identification  
4. Synthesis recommendations
```

### Advanced Analysis Techniques

#### Content Gap Analysis
InfraNodus identifies structural holes in knowledge networks:
- **Missing Connections**: Concepts that should be linked
- **Underexplored Areas**: Topics with sparse connections
- **Bridge Opportunities**: Concepts that could connect clusters

#### Topical Authority Building
For conference content optimization:
1. **Cluster Analysis**: Identify main topic areas
2. **Gap Detection**: Find missing subtopics
3. **Content Recommendations**: Suggest additional areas to cover
4. **SEO Optimization**: Improve discoverability

### Network Metrics and Insights

#### Key Metrics
- **Betweenness Centrality**: Most important bridging concepts
- **Clustering Coefficient**: How well concepts group together
- **Network Density**: Overall connectivity level
- **Modularity**: Quality of topic separation

#### Interpretation Guide
- **High Centrality**: Core themes requiring attention
- **Low Connectivity**: Areas needing development
- **Isolated Clusters**: Potentially separate tracks/sessions
- **Bridge Nodes**: Cross-cutting themes

## Conference Content Analysis

### Pre-Conference Planning

#### Speaker Abstract Analysis
```
Workflow:
1. Collect all speaker abstracts
2. Generate knowledge graph: "Create a knowledge graph from these conference abstracts"
3. Identify clusters: "Show me the main topical clusters"
4. Find gaps: "What content gaps exist in our program?"
5. Generate recommendations: "Suggest additional speakers or topics"
```

#### Track Development
```
Process:
1. Analyze individual tracks
2. Compare track overlap: "Compare the AI track with the Infrastructure track"
3. Identify unique positioning: "What makes each track distinct?"
4. Balance content: "How can we better distribute topics?"
```

#### Audience Interest Analysis
```
Research Steps:
1. Search analysis: "What do people search for about digital conferences?"
2. Gap identification: "What topics do people want but conferences don't cover?"
3. Trend analysis: "Generate a graph of current conference trends"
4. Positioning strategy: "How can DoL 2025 be differentiated?"
```

### During Conference Operations

#### Real-time Content Monitoring
```
Live Analysis:
1. Session transcript analysis
2. Audience question clustering  
3. Social media sentiment tracking
4. Emerging theme identification
```

#### Dynamic Programming Adjustments
```
Adaptive Planning:
1. Identify hot topics from early sessions
2. Adjust later session focus
3. Plan impromptu discussions
4. Optimize networking sessions
```

### Post-Conference Analysis

#### Impact Assessment
```
Evaluation Process:
1. Combine all session content
2. Generate comprehensive knowledge graph
3. Measure content coverage
4. Identify successful themes
5. Plan future improvements
```

#### Knowledge Extraction
```
Documentation:
1. Create permanent knowledge graphs
2. Generate research questions for follow-up
3. Identify collaboration opportunities
4. Build institutional knowledge base
```

## Integration with YouTube Streaming

### Content Optimization for Streaming

#### Pre-Stream Content Analysis
```
Preparation Workflow:
1. Analyze session content: "Generate overview of today's sessions"
2. Identify key themes: "What are the main topics for Nodväst stream?"
3. Create talking points: "Generate discussion points from this agenda"
4. Prepare introductions: "Create speaker introductions based on their abstracts"
```

#### Multi-Stream Content Coordination
```
For DoL 2025 Multi-Node Setup:
1. Analyze content for each node (Väst, Syd, Öst, Midd)
2. Identify cross-node themes: "What topics appear across all nodes?"
3. Plan inter-node discussions: "Generate questions for cross-node dialogue"
4. Avoid content duplication: "Ensure unique positioning for each stream"
```

### Real-time Stream Enhancement

#### Dynamic Content Generation
```
Live Operations:
1. Monitor chat questions: "Analyze audience questions for emerging themes"
2. Generate follow-up topics: "What additional topics should we explore?"
3. Create transition content: "Generate smooth transitions between sessions"
4. Prepare summary points: "Summarize key insights from this session"
```

#### Audience Engagement Optimization
```
Interactive Elements:
1. Question prioritization: "Rank audience questions by relevance"
2. Topic bridging: "Connect this question to previous discussions"  
3. Expert identification: "Who in our network can address this topic?"
4. Follow-up planning: "Generate action items from this discussion"
```

### Post-Stream Content Development

#### Knowledge Capture
```
Documentation Process:
1. Transcript analysis: "Generate knowledge graph from stream transcripts"
2. Key moment identification: "Find the most important discussion points"
3. Quote extraction: "Identify quotable moments from speakers"
4. Topic thread tracking: "Map how topics evolved during streams"
```

#### Content Repurposing
```
Multi-format Development:
1. Blog post generation: "Create blog posts from stream highlights"
2. Social media content: "Generate social media posts from key insights"
3. Newsletter content: "Summarize stream content for newsletter"
4. Future planning: "Identify topics for next year's conference"
```

## Troubleshooting

### Common Issues and Solutions

#### API Connection Issues

**Problem**: "Rate limit exceeded"
**Solutions**:
1. Check API key configuration
2. Upgrade to higher-tier InfraNodus account
3. Implement request throttling
4. Use doNotSave parameter to reduce API usage

**Problem**: MCP server not responding
**Solutions**:
1. Verify Node.js installation and version
2. Check environment variable configuration
3. Restart AI client application
4. Validate InfraNodus API key

#### Graph Generation Problems

**Problem**: Poor quality knowledge graphs
**Solutions**:
1. Ensure text has sufficient content (minimum 100-200 words)
2. Use clear, well-structured text
3. Enable entity detection in settings
4. Try different topic naming algorithms

**Problem**: Missing connections in graphs
**Solutions**:
1. Increase text length for better analysis
2. Use more diverse vocabulary
3. Enable advanced network analysis features
4. Manually review and adjust graph parameters

#### Configuration Issues

**Problem**: Tools not appearing in AI client
**Solutions**:
1. Verify MCP configuration syntax
2. Check file paths for local installations
3. Restart AI client completely
4. Review logs for configuration errors

**Problem**: Smithery authentication failures
**Solutions**:
1. Verify Smithery account setup
2. Check API key permissions
3. Try disconnecting and reconnecting
4. Contact Smithery support if persistent

### Performance Optimization

#### Local Installation Performance
```
Optimization Tips:
1. Ensure adequate system resources
2. Close unnecessary applications
3. Use SSD storage for faster processing
4. Monitor Node.js memory usage
```

#### API Usage Optimization
```
Efficiency Strategies:
1. Batch similar requests
2. Use appropriate analysis depth settings
3. Cache results for repeated queries
4. Implement request queuing for high-volume use
```

### Debugging Tools

#### Log Analysis
Check logs for common issues:
- Connection timeout errors
- Authentication failures
- Rate limiting warnings
- Processing errors

#### Testing Commands
Use these to verify functionality:
- "Generate a simple knowledge graph from this sentence"
- "Search for any existing graphs in my account"
- "Test the connection to InfraNodus API"

## Best Practices

### Content Preparation

#### Text Quality Guidelines
1. **Minimum Length**: Use at least 100-200 words for meaningful analysis
2. **Clear Structure**: Use proper headings and paragraph breaks
3. **Rich Vocabulary**: Include domain-specific terminology
4. **Context Clarity**: Provide sufficient background information

#### Pre-Processing Tips
```
Optimal Text Preparation:
1. Remove excessive formatting
2. Combine related documents
3. Ensure consistent terminology
4. Include relevant metadata
```

### Analysis Strategy

#### Systematic Approach
```
Recommended Workflow:
1. Start with text overview
2. Generate initial knowledge graph
3. Identify content gaps
4. Create topical clusters
5. Generate research questions
6. Perform comparative analysis
```

#### Quality Assurance
```
Validation Steps:
1. Review generated graphs for accuracy
2. Verify topic clusters make sense
3. Check research questions for relevance
4. Validate content gaps are meaningful
```

### Conference-Specific Best Practices

#### Planning Phase
```
Strategic Analysis:
1. Analyze competitor conferences
2. Research audience interests
3. Identify market gaps
4. Plan balanced content distribution
```

#### Execution Phase
```
Real-time Optimization:
1. Monitor content quality continuously
2. Adapt to audience feedback
3. Track emerging themes
4. Document lessons learned
```

#### Follow-up Phase
```
Knowledge Consolidation:
1. Create comprehensive conference knowledge graph
2. Generate actionable insights
3. Plan improvements for next year
4. Share knowledge with stakeholders
```

### Data Privacy and Security

#### Privacy Protection
```
Best Practices:
1. Use doNotSave parameter for sensitive content
2. Review data retention policies
3. Implement secure authentication
4. Regular security audits
```

#### Compliance Considerations
```
Regulatory Alignment:
1. GDPR compliance for EU participants
2. Data localization requirements
3. Corporate privacy policies
4. Intellectual property protection
```

---

This comprehensive manual provides complete guidance for integrating InfraNodus MCP Server into your conference planning and streaming operations, enabling advanced knowledge graph analysis and content optimization through AI-powered workflows.