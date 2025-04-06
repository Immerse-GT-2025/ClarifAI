// Camera and zoom settings
export const CAMERA_CONFIG = {
    DEFAULT_FOV: 60,
    MIN_ZOOM: 1.0,
    MAX_ZOOM: 4.0,
    ZOOM_SPEED: 0.1,
    DEFAULT_ZOOM: 2.5
};

// Detection settings
export const DETECTION_CONFIG = {
    CONFIDENCE_THRESHOLD: 0.6,
    UPDATE_INTERVAL: 100, // ms
    MOCK_CONFIDENCE: 0.8
};

// Lyrics settings
export const LYRICS_CONFIG = {
    DISPLAY_DURATION: 3000, // ms
    TRANSITION_DURATION: 300, // ms
    FONT_SIZE: 24,
    POSITION_Y: '20%'
};

// Gesture settings
export const GESTURE_CONFIG = {
    SWIPE_THRESHOLD: 0.3,
    SWIPE_DURATION: 300 // ms
};

// UI Configuration
export const UI_CONFIG = {
    // Screen dimensions
    SCREEN_WIDTH: 390,
    SCREEN_HEIGHT: 844,
    
    // Colors
    colors: {
        primary: {
            main: '#1E3A6E',
            light: '#2563eb',
            dark: '#1e40af',
            gradient: ['#1e40af', '#3b82f6']
        },
        secondary: {
            main: '#7c3aed',
            light: '#a78bfa',
            dark: '#5b21b6',
            gradient: ['#6d28d9', '#8b5cf6']
        },
        background: {
            main: '#0A1A3B',
            gradient: ['from-purple-900', 'to-indigo-900']
        },
        text: {
            primary: '#FFFFFF',
            secondary: '#E5E7EB',
            disabled: '#9CA3AF'
        }
    },
    
    // Typography
    typography: {
        regular: {
            fontFamily: 'Inter',
            sizes: {
                xs: 12,
                sm: 14,
                base: 16,
                lg: 18,
                xl: 20,
                '2xl': 24,
                '3xl': 30,
                '4xl': 36,
                '5xl': 48
            }
        },
        dyslexic: {
            fontFamily: 'OpenDyslexic',
            sizes: {
                xs: 14,
                sm: 16,
                base: 18,
                lg: 20,
                xl: 22,
                '2xl': 26,
                '3xl': 32,
                '4xl': 38,
                '5xl': 50
            }
        }
    },
    
    // Animation timings
    animation: {
        short: 200,
        medium: 300,
        long: 500,
        transitions: {
            easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
            easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
            easeIn: 'cubic-bezier(0.4, 0, 1, 1)'
        }
    },
    
    // Component specific styles
    components: {
        button: {
            padding: {
                x: 24,
                y: 16
            },
            borderRadius: 12,
            variants: {
                primary: {
                    background: 'bg-gradient-to-r from-purple-600 to-indigo-600',
                    hover: 'hover:from-purple-500 hover:to-indigo-500',
                    text: 'text-white'
                },
                secondary: {
                    background: 'bg-white bg-opacity-10',
                    hover: 'hover:bg-opacity-20',
                    text: 'text-white'
                }
            }
        },
        toggle: {
            width: 56,
            height: 32,
            thumbSize: 24,
            colors: {
                off: 'bg-purple-900 bg-opacity-50',
                on: 'bg-purple-500',
                thumb: 'bg-white'
            }
        },
        screen: {
            padding: {
                x: 24,
                y: 48
            }
        }
    },
    
    // Layout
    layout: {
        spacing: {
            xs: 4,
            sm: 8,
            md: 16,
            lg: 24,
            xl: 32,
            '2xl': 48,
            '3xl': 64
        },
        maxWidth: {
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280
        }
    }
};

// Screen IDs for reference
export const SCREEN_IDS = {
    OPENING: 'opening-screen',
    SETTINGS: 'settings-screen',
    MAIN: 'main-screen',
    LYRICS: 'lyrics-container'
};

// Component IDs
export const COMPONENT_IDS = {
    buttons: {
        start: 'start-button',
        begin: 'begin-button',
        english: 'english-button',
        spanish: 'spanish-button',
        french: 'french-button'
    },
    toggles: {
        dyslexia: 'dyslexia-toggle',
        lyrics: 'lyrics-toggle'
    },
    containers: {
        languageOptions: 'language-options',
        settingsToggles: 'settings-toggles'
    }
};

// Text content and translations
export const TRANSLATIONS = {
    'English': {
        startButton: 'Get Started',
        beginButton: 'Begin Experience',
        dyslexiaMode: 'Dyslexia-friendly mode',
        showLyrics: 'Show lyrics',
        title: 'Adaptive AR for Concerts',
        subtitle: 'Your concert, your way'
    },
    'Español': {
        startButton: 'Comenzar',
        beginButton: 'Iniciar Experiencia',
        dyslexiaMode: 'Modo para dislexia',
        showLyrics: 'Mostrar letra',
        title: 'AR Adaptativo para Conciertos',
        subtitle: 'Tu concierto, a tu manera'
    },
    'Français': {
        startButton: 'Commencer',
        beginButton: 'Démarrer l\'expérience',
        dyslexiaMode: 'Mode dyslexie',
        showLyrics: 'Afficher paroles',
        title: 'RA Adaptative pour Concerts',
        subtitle: 'Votre concert, à votre façon'
    }
}; 