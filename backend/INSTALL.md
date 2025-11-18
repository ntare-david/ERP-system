# Installation Guide

## Fixing pydantic-core Rust Compilation Error

If you encounter an error about Rust/Cargo when installing dependencies, here are solutions:

### Solution 1: Use Pre-built Wheels (Recommended)

The `requirements.txt` has been updated to use pydantic 2.0.3 which has pre-built wheels available and doesn't require Rust compilation.

### Solution 2: Install Rust (Alternative)

If you need the latest pydantic version, install Rust:

1. **Windows**: Download and run the installer from https://rustup.rs/
2. **After installation**, restart your terminal and try installing again:
   ```bash
   pip install -r requirements.txt
   ```

### Solution 3: Use pip with --only-binary flag

Force pip to use only pre-built wheels:
```bash
pip install --only-binary :all: -r requirements.txt
```

### Solution 4: Upgrade pip and setuptools

Sometimes upgrading pip helps:
```bash
python -m pip install --upgrade pip setuptools wheel
pip install -r requirements.txt
```

## Quick Start

1. Create virtual environment:
   ```bash
   python -m venv venv
   venv\Scripts\activate  # Windows
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the server:
   ```bash
   python run.py
   ```

