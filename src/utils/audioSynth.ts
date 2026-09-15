// Web Audio API Retro 8-Bit Chiptune Synthesizer
// Women Empowerment Anthems Edition

type Note = [string, number]; // [Note name like "C4", duration in beats]

export interface Song {
  id: string;
  title: string;
  artist: string;
  durationSeconds: number;
  tempo: number;
  melody: Note[];
  bass: Note[];
  youtubeId?: string;
  audioUrl: string;
  coverColor: string;
  anthemTheme: string;
}

export const NOTE_FREQS: Record<string, number> = {
  REST: 0,
  // Octave 3
  C3: 130.81, Cs3: 138.59, D3: 146.83, Ds3: 155.56, Eb3: 155.56, E3: 164.81, F3: 174.61, Fs3: 185.00,
  G3: 196.00, Gs3: 207.65, Ab3: 207.65, A3: 220.00, As3: 233.08, Bb3: 233.08, B3: 246.94,
  // Octave 4
  C4: 261.63, Cs4: 277.18, D4: 293.66, Ds4: 311.13, Eb4: 311.13, E4: 329.63, F4: 349.23, Fs4: 369.99,
  G4: 392.00, Gs4: 415.30, Ab4: 415.30, A4: 440.00, As4: 466.16, Bb4: 466.16, B4: 493.88,
  // Octave 5
  C5: 523.25, Cs5: 554.37, D5: 587.33, Ds5: 622.25, Eb5: 622.25, E5: 659.25, F5: 698.46, Fs5: 739.99,
  G5: 783.99, Gs5: 830.61, Ab5: 830.61, A5: 880.00, As5: 932.33, Bb5: 932.33, B5: 987.77,
  // Octave 6
  C6: 1046.50
};

export const TRACK_LIST: Song[] = [
  {
    id: 'girls-just-want-to-have-fun',
    title: 'Girls Just Want To Have Fun',
    artist: 'Cyndi Lauper',
    anthemTheme: 'Feminine Joy & Independence',
    durationSeconds: 235,
    tempo: 120,
    coverColor: '#ffd1dc',
    youtubeId: 'PIb6AZdTr-A',
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/95/1d/ed/951ded3d-4e31-1452-42b6-cc36070a2204/mzaf_10794841548233618528.plus.aac.p.m4a',
    melody: [
      // Iconic catchy hook & chorus
      ['Fs4', 0.5], ['Fs4', 0.5], ['Fs4', 0.5], ['G4', 0.5], ['A4', 1.0], ['REST', 0.5], ['A4', 0.5],
      ['B4', 0.5], ['A4', 0.5], ['G4', 0.5], ['Fs4', 0.5], ['E4', 1.0], ['REST', 0.5], ['E4', 0.5],
      ['Fs4', 0.5], ['G4', 0.5], ['A4', 1.0], ['Fs4', 0.5], ['D4', 1.0], ['REST', 0.5],
      // Chorus: "Oh girls, they wanna have fun..."
      ['D5', 1.0], ['B4', 1.0], ['A4', 0.5], ['Fs4', 0.5], ['G4', 0.5], ['A4', 0.5],
      ['B4', 1.0], ['REST', 0.5], ['A4', 0.5], ['G4', 0.5], ['Fs4', 0.5], ['E4', 1.0],
      ['D4', 0.5], ['E4', 0.5], ['Fs4', 1.0], ['E4', 0.5], ['D4', 1.5], ['REST', 0.5],
      // Hook repeat
      ['D5', 1.0], ['Cs5', 0.5], ['B4', 0.5], ['A4', 1.0], ['Fs4', 1.0],
      ['G4', 0.5], ['A4', 0.5], ['B4', 1.0], ['A4', 0.5], ['G4', 0.5], ['Fs4', 1.5]
    ],
    bass: [
      ['D3', 1.0], ['D3', 1.0], ['G3', 1.0], ['G3', 1.0],
      ['B3', 1.0], ['B3', 1.0], ['A3', 1.0], ['A3', 1.0],
      ['D3', 1.0], ['D3', 1.0], ['G3', 1.0], ['G3', 1.0],
      ['E3', 1.0], ['E3', 1.0], ['A3', 1.0], ['A3', 1.0]
    ]
  },
  {
    id: 'respect',
    title: 'Respect',
    artist: 'Aretha Franklin',
    anthemTheme: 'Self-Worth & Queen of Soul Anthem',
    durationSeconds: 147,
    tempo: 115,
    coverColor: '#fed7aa',
    youtubeId: '6FOUqQt3Kg0',
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/99/74/40/997440f5-f543-165d-321a-5a64245a6c1c/mzaf_7740075940996149397.plus.aac.p.m4a',
    melody: [
      // "What you want, baby I got it"
      ['C4', 0.5], ['C4', 0.5], ['C4', 0.5], ['E4', 0.5], ['G4', 0.5], ['A4', 0.5], ['G4', 0.5], ['E4', 0.5],
      ['REST', 0.5],
      // "What you need, you know I got it"
      ['C4', 0.5], ['C4', 0.5], ['C4', 0.5], ['E4', 0.5], ['G4', 0.5], ['A4', 0.5], ['G4', 0.5], ['E4', 0.5],
      ['REST', 0.5],
      // "All I'm askin' is for a little respect"
      ['G4', 0.5], ['G4', 0.5], ['G4', 0.5], ['E4', 0.5], ['G4', 0.5], ['A4', 0.5], ['C5', 0.5], ['A4', 0.5],
      ['G4', 0.5], ['E4', 0.5], ['D4', 0.5], ['C4', 1.0],
      // "R-E-S-P-E-C-T, find out what it means to me!"
      ['C5', 0.5], ['D5', 0.5], ['E5', 0.5], ['D5', 0.5], ['C5', 0.5], ['A4', 0.5], ['G4', 1.0],
      ['C5', 0.5], ['C5', 0.5], ['A4', 0.5], ['G4', 0.5], ['A4', 0.5], ['C5', 0.5], ['D5', 0.5], ['C5', 1.5]
    ],
    bass: [
      ['C3', 1.0], ['C3', 1.0], ['F3', 1.0], ['F3', 1.0],
      ['C3', 1.0], ['C3', 1.0], ['G3', 1.0], ['G3', 1.0],
      ['C3', 1.0], ['F3', 1.0], ['C3', 1.0], ['G3', 1.0]
    ]
  },
  {
    id: 'run-the-world-girls',
    title: 'Run the World (Girls)',
    artist: 'Beyoncé',
    anthemTheme: 'Female Leadership & Power',
    durationSeconds: 236,
    tempo: 127,
    coverColor: '#fbcfe8',
    youtubeId: 'VBmMU_iwe6U',
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/2a/a5/2f/2aa52fa8-b832-98a9-bef0-324138945b35/mzaf_8862034325127303446.plus.aac.p.m4a',
    melody: [
      // High-energy rhythmic chant: "Who run the world? Girls!"
      ['Fs4', 0.5], ['Fs4', 0.25], ['Fs4', 0.25], ['A4', 0.5], ['Fs4', 1.0], ['REST', 0.5],
      ['Fs4', 0.5], ['Fs4', 0.25], ['Fs4', 0.25], ['A4', 0.5], ['Fs4', 1.0], ['REST', 0.5],
      ['Fs4', 0.5], ['Fs4', 0.25], ['Fs4', 0.25], ['A4', 0.5], ['Fs4', 1.0], ['REST', 0.5],
      // "Who run this mutha? Girls!"
      ['A4', 0.5], ['A4', 0.25], ['A4', 0.25], ['B4', 0.5], ['A4', 1.0], ['REST', 0.5],
      ['Fs4', 0.5], ['Fs4', 0.25], ['Fs4', 0.25], ['A4', 0.5], ['Fs4', 1.0],
      // Melodic hook
      ['D5', 0.5], ['D5', 0.5], ['B4', 0.5], ['A4', 0.5], ['B4', 0.5], ['A4', 0.5], ['Fs4', 0.5], ['E4', 0.5], ['Fs4', 1.5]
    ],
    bass: [
      ['B3', 1.0], ['B3', 1.0], ['G3', 1.0], ['G3', 1.0],
      ['D3', 1.0], ['D3', 1.0], ['A3', 1.0], ['A3', 1.0]
    ]
  },
  {
    id: 'i-will-survive',
    title: 'I Will Survive',
    artist: 'Gloria Gaynor',
    anthemTheme: 'Unstoppable Resilience & Strength',
    durationSeconds: 198,
    tempo: 116,
    coverColor: '#c4b5fd',
    youtubeId: '6dYWe1c3OyU',
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/e7/40/66/e74066a0-d000-1896-cd2e-7b2bc97393ad/mzaf_6935563640938257821.plus.aac.p.m4a',
    melody: [
      // "At first I was afraid, I was petrified"
      ['A4', 0.5], ['B4', 0.5], ['C5', 0.5], ['B4', 0.5], ['A4', 0.5], ['Gs4', 0.5], ['A4', 0.5], ['B4', 1.0],
      ['REST', 0.5],
      // "Kept thinking I could never live without you by my side"
      ['G4', 0.5], ['A4', 0.5], ['B4', 0.5], ['A4', 0.5], ['G4', 0.5], ['Fs4', 0.5], ['G4', 0.5], ['A4', 1.0],
      ['REST', 0.5],
      // "Oh no, not I, I will survive!"
      ['C5', 0.5], ['D5', 0.5], ['E5', 1.0], ['REST', 0.5],
      ['E5', 0.5], ['D5', 0.5], ['C5', 0.5], ['B4', 0.5], ['C5', 0.5], ['D5', 1.0],
      // "As long as I know how to love I know I'll stay alive"
      ['D5', 0.5], ['C5', 0.5], ['B4', 0.5], ['A4', 0.5], ['B4', 0.5], ['C5', 0.5], ['D5', 0.5], ['E5', 0.5],
      ['D5', 0.5], ['C5', 0.5], ['B4', 0.5], ['A4', 1.5]
    ],
    bass: [
      // Iconic circle of fifths disco progression
      ['A3', 1.0], ['D3', 1.0], ['G3', 1.0], ['C3', 1.0],
      ['F3', 1.0], ['B3', 1.0], ['E3', 1.0], ['A3', 1.0]
    ]
  },
  {
    id: 'just-a-girl',
    title: 'Just a Girl',
    artist: 'No Doubt',
    anthemTheme: 'Feminist Autonomy & Rebellion',
    durationSeconds: 210,
    tempo: 108,
    coverColor: '#e9d5ff',
    youtubeId: 'PHzOOQfhPFg',
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/53/b5/14/53b51497-2e19-8a3a-9f8b-8a61b6e54846/mzaf_12035895016809438438.plus.aac.p.m4a',
    melody: [
      // Iconic synth/guitar intro hook
      ['D4', 0.5], ['Fs4', 0.5], ['A4', 0.5], ['D5', 0.5], ['Cs5', 0.5], ['B4', 0.5], ['A4', 0.5], ['Fs4', 0.5],
      ['G4', 0.5], ['Fs4', 0.5], ['E4', 1.0], ['REST', 0.5],
      // Chorus: "'Cause I'm just a girl, little old me"
      ['Fs4', 0.5], ['Fs4', 0.5], ['Fs4', 0.5], ['G4', 0.5], ['A4', 0.5], ['B4', 0.5], ['A4', 0.5], ['Fs4', 0.5],
      ['E4', 0.5], ['D4', 1.0],
      // "Well, don't let me out of your sight"
      ['D4', 0.5], ['E4', 0.5], ['Fs4', 0.5], ['G4', 0.5], ['Fs4', 0.5], ['E4', 0.5], ['D4', 0.5], ['E4', 1.0],
      // "'Cause I'm just a girl, all pretty and petite"
      ['Fs4', 0.5], ['Fs4', 0.5], ['Fs4', 0.5], ['G4', 0.5], ['A4', 0.5], ['B4', 0.5], ['A4', 0.5], ['Fs4', 0.5],
      ['E4', 0.5], ['D4', 1.0],
      // "So don't let me have any say!"
      ['D5', 0.5], ['Cs5', 0.5], ['B4', 0.5], ['A4', 0.5], ['G4', 0.5], ['Fs4', 0.5], ['E4', 0.5], ['D4', 1.5]
    ],
    bass: [
      ['D3', 1.0], ['D3', 1.0], ['B3', 1.0], ['B3', 1.0],
      ['G3', 1.0], ['G3', 1.0], ['A3', 1.0], ['A3', 1.0]
    ]
  }
];

class ChiptuneSynthEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isPlaying: boolean = false;
  private currentTrackIndex: number = 0;
  private timerId: number | null = null;
  private noteIndex: number = 0;
  private bassIndex: number = 0;
  private volume: number = 0.7;
  private listeners: Set<() => void> = new Set();
  public visualizerData: number[] = [0.3, 0.6, 0.4, 0.8];
  public onTrackEnded?: () => void;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public subscribe(fn: () => void) {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  }

  private notify() {
    this.listeners.forEach(fn => fn());
  }

  public playTrack(index: number) {
    this.initContext();
    this.currentTrackIndex = (index + TRACK_LIST.length) % TRACK_LIST.length;
    this.noteIndex = 0;
    this.bassIndex = 0;
    this.isPlaying = true;
    this.scheduleNextNote();
    this.notify();
  }

  public pause() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
    this.visualizerData = [0.1, 0.1, 0.1, 0.1];
    this.notify();
  }

  public resume() {
    if (!this.isPlaying) {
      this.initContext();
      this.isPlaying = true;
      this.scheduleNextNote();
      this.notify();
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
    this.notify();
  }

  public getVolume(): number {
    return this.volume;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getCurrentTrack(): Song {
    return TRACK_LIST[this.currentTrackIndex];
  }

  public getCurrentTrackIndex(): number {
    return this.currentTrackIndex;
  }

  private scheduleNextNote() {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;

    const track = TRACK_LIST[this.currentTrackIndex];
    const beatDuration = 60 / track.tempo; // in seconds

    const [noteName, beats] = track.melody[this.noteIndex];
    const noteDuration = beats * beatDuration;

    // Play melody note
    if (noteName !== 'REST' && NOTE_FREQS[noteName]) {
      this.playBeep(NOTE_FREQS[noteName], noteDuration * 0.85, 'square', 0.25);
    }

    // Play bass note periodically
    const [bassName, bassBeats] = track.bass[this.bassIndex];
    if (bassName !== 'REST' && NOTE_FREQS[bassName]) {
      this.playBeep(NOTE_FREQS[bassName], bassBeats * beatDuration * 0.9, 'triangle', 0.35);
    }

    // Update equalizer bar animation values
    this.visualizerData = [
      Math.random() * 0.7 + 0.3,
      Math.random() * 0.8 + 0.2,
      Math.random() * 0.9 + 0.1,
      Math.random() * 0.6 + 0.4
    ];

    const isMelodyEnd = this.noteIndex + 1 >= track.melody.length;
    this.noteIndex = (this.noteIndex + 1) % track.melody.length;
    if (this.noteIndex % 2 === 0) {
      this.bassIndex = (this.bassIndex + 1) % track.bass.length;
    }

    this.notify();

    // If melody finished and onTrackEnded is hooked up, notify to autoplay next track
    if (isMelodyEnd && this.onTrackEnded) {
      this.timerId = window.setTimeout(() => {
        this.onTrackEnded?.();
      }, noteDuration * 1000);
      return;
    }

    // Schedule next
    this.timerId = window.setTimeout(() => {
      this.scheduleNextNote();
    }, noteDuration * 1000);
  }

  private playBeep(freq: number, duration: number, type: OscillatorType, gainLevel: number) {
    if (!this.ctx || !this.masterGain) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Cute 8-bit vibrato
      if (type === 'square') {
        const vibrato = this.ctx.createOscillator();
        const vibratoGain = this.ctx.createGain();
        vibrato.frequency.setValueAtTime(6, this.ctx.currentTime);
        vibratoGain.gain.setValueAtTime(3, this.ctx.currentTime);
        vibrato.connect(vibratoGain);
        vibratoGain.connect(osc.frequency);
        vibrato.start();
        vibrato.stop(this.ctx.currentTime + duration);
      }

      // 8-bit Envelope: Fast attack, slight decay, sustain, fast release
      gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(gainLevel, this.ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // AudioContext safe catch
    }
  }
}

export const chiptuneEngine = new ChiptuneSynthEngine();
