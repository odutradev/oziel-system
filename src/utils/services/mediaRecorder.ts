interface MediaRecorderConfig {
  videoBitsPerSecond?: number;
  audioBitsPerSecond?: number;
  mimeType?: string;
}

interface CameraDevice {
  deviceId: string;
  label: string;
  kind: string;
}

class MediaRecorderService {
  private mediaRecorder: MediaRecorder | null = null;
  private recordedChunks: Blob[] = [];
  private stream: MediaStream | null = null;

  async getCameraDevices(): Promise<CameraDevice[]> {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices
      .filter(device => device.kind === 'videoinput')
      .map(device => ({
        deviceId: device.deviceId,
        label: device.label || `Câmera ${device.deviceId.slice(0, 8)}`,
        kind: device.kind
      }));
  }

  async getAudioDevices(): Promise<CameraDevice[]> {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices
      .filter(device => device.kind === 'audioinput')
      .map(device => ({
        deviceId: device.deviceId,
        label: device.label || `Microfone ${device.deviceId.slice(0, 8)}`,
        kind: device.kind
      }));
  }

  async startRecording(
    videoDeviceId: string,
    audioDeviceId?: string,
    config: MediaRecorderConfig = {}
  ): Promise<MediaStream> {
    try {
      const constraints: MediaStreamConstraints = {
        video: {
          deviceId: videoDeviceId ? { exact: videoDeviceId } : undefined,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: audioDeviceId ? {
          deviceId: { exact: audioDeviceId }
        } : false
      };

      this.stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      const options: MediaRecorderOptions = {
        mimeType: config.mimeType || 'video/webm;codecs=vp9',
        videoBitsPerSecond: config.videoBitsPerSecond || 2500000,
        audioBitsPerSecond: config.audioBitsPerSecond || 128000
      };

      this.mediaRecorder = new MediaRecorder(this.stream, options);
      this.recordedChunks = [];

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.recordedChunks.push(event.data);
        }
      };

      this.mediaRecorder.start(1000);
      
      return this.stream;
    } catch (error) {
      console.error('Error starting recording:', error);
      throw error;
    }
  }

  async startScreenRecording(
    includeSystemAudio: boolean = false,
    microphoneDeviceId?: string,
    config: MediaRecorderConfig = {}
  ): Promise<MediaStream> {
    try {
      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          cursor: 'always',
          displaySurface: 'monitor'
        },
        audio: includeSystemAudio
      } as any);

      let audioStream: MediaStream | null = null;
      if (microphoneDeviceId) {
        audioStream = await navigator.mediaDevices.getUserMedia({
          audio: {
            deviceId: { exact: microphoneDeviceId }
          }
        });
      }

      if (audioStream) {
        const audioTrack = audioStream.getAudioTracks()[0];
        if (audioTrack) {
          displayStream.addTrack(audioTrack);
        }
      }

      this.stream = displayStream;
      
      const options: MediaRecorderOptions = {
        mimeType: config.mimeType || 'video/webm;codecs=vp9',
        videoBitsPerSecond: config.videoBitsPerSecond || 2500000,
        audioBitsPerSecond: config.audioBitsPerSecond || 128000
      };

      this.mediaRecorder = new MediaRecorder(this.stream, options);
      this.recordedChunks = [];

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.recordedChunks.push(event.data);
        }
      };

      this.mediaRecorder.start(1000);
      
      return this.stream;
    } catch (error) {
      console.error('Error starting screen recording:', error);
      throw error;
    }
  }

  stopRecording(): Promise<Blob> {
    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder) {
        reject(new Error('No recording in progress'));
        return;
      }

      this.mediaRecorder.onstop = () => {
        const blob = new Blob(this.recordedChunks, { type: 'video/webm' });
        this.cleanup();
        resolve(blob);
      };

      this.mediaRecorder.stop();
    });
  }

  pauseRecording(): void {
    if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
      this.mediaRecorder.pause();
    }
  }

  resumeRecording(): void {
    if (this.mediaRecorder && this.mediaRecorder.state === 'paused') {
      this.mediaRecorder.resume();
    }
  }

  isRecording(): boolean {
    return this.mediaRecorder?.state === 'recording';
  }

  isPaused(): boolean {
    return this.mediaRecorder?.state === 'paused';
  }

  private cleanup(): void {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    this.mediaRecorder = null;
  }

  cancelRecording(): void {
    this.recordedChunks = [];
    this.cleanup();
  }
}

export const mediaRecorderService = new MediaRecorderService();
