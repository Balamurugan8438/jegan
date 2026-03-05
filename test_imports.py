#!/usr/bin/env python3
import sys
print(f"Python path: {sys.executable}")
print(f"Python version: {sys.version}")

print("\nTesting imports...")

try:
    print("1. Importing moviepy...")
    import moviepy
    print("   ✓ moviepy imported successfully")
except Exception as e:
    print(f"   ✗ Error: {e}")

try:
    print("2. Importing moviepy.editor...")
    from moviepy import editor
    print("   ✓ moviepy.editor imported successfully")
except Exception as e:
    print(f"   ✗ Error: {e}")
    import traceback
    traceback.print_exc()

try:
    print("3. Importing VideoFileClip...")
    from moviepy.video.io.VideoFileClip import VideoFileClip
    print("   ✓ VideoFileClip imported successfully")
except Exception as e:
    print(f"   ✗ Error: {e}")
    import traceback
    traceback.print_exc()

try:
    print("4. Importing speech_recognition...")
    import speech_recognition
    print("   ✓ speech_recognition imported successfully")
except Exception as e:
    print(f"   ✗ Error: {e}")

try:
    print("5. Importing pydub...")
    import pydub
    print("   ✓ pydub imported successfully")
except Exception as e:
    print(f"   ✗ Error: {e}")

print("\nAll imports completed!")
