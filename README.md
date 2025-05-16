# Claude AI Recipe Assistant

A Next.js application that demonstrates how to use Anthropic's Claude AI with the AI SDK to create a recipe assistant that answers questions based only on custom vegan black bean recipe data.

![Claude AI Recipe Assistant](https://placeholder.svg?height=400&width=800)

## Overview

This project showcases how to implement Retrieval-Augmented Generation (RAG) with Claude AI to create a specialized assistant that only answers questions based on a curated dataset of vegan black bean recipes. The application includes:

- Text generation interface for asking questions about recipes
- Chat interface for conversational interactions
- Recipe browsing page to view all available recipes
- Custom data retrieval system that finds relevant recipes for each query

## How It Works

### RAG System Architecture

The application uses a Retrieval-Augmented Generation (RAG) approach:

1. **Data Storage**: Vegan black bean recipes are stored in a structured format in `data/recipes.ts`
2. **Query Processing**: When a user asks a question, the system searches for relevant recipes
3. **Context Injection**: Relevant recipes are formatted and injected into Claude's system prompt
4. **Constrained Response**: Claude generates answers using only the provided recipe information

This approach ensures that Claude only provides information that actually exists in the recipe database, preventing hallucinations or made-up information.

### Key Components

- **Recipe Data Store**: Collection of structured recipe data
- **Recipe Search Utility**: Simple keyword-based search to find relevant recipes
- **Context Formatter**: Converts recipe objects into text context for Claude
- **AI Integration**: Uses the AI SDK to communicate with Claude
- **User Interfaces**: Text generation and chat interfaces for interacting with the assistant

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Anthropic API key
- OpenAI API key (for embeddings in the full vector search implementation)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/claude-recipe-assistant.git
   cd claude-recipe-assistant