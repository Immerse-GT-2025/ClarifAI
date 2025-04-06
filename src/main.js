// Initialize Lens Studio components
const Scene = require('Scene');
const TouchGestures = require('TouchGestures');
const CameraInfo = require('CameraInfo');
const Diagnostics = require('Diagnostics');
const Animation = require('Animation');
const Materials = require('Materials');
const Patches = require('Patches');
const Persistence = require('Persistence');

// UI Screens
const UI_SCREENS = {
    OPENING: 'opening-screen',
    SETTINGS: 'settings-screen',
    MAIN: 'main-screen'
};

// State management
let currentScreen = UI_SCREENS.OPENING;
let settings = {
    language: 'English',
    dyslexiaMode: false,
    showLyrics: true
};

// Screen elements initialization
Promise.all([
    Scene.root.findFirst('opening-screen'),
    Scene.root.findFirst('settings-screen'),
    Scene.root.findFirst('main-screen'),
    Scene.root.findFirst('lyrics-container')
]).then(([openingScreen, settingsScreen, mainScreen, lyricsContainer]) => {
    // Store screen references
    const screens = {
        [UI_SCREENS.OPENING]: openingScreen,
        [UI_SCREENS.SETTINGS]: settingsScreen,
        [UI_SCREENS.MAIN]: mainScreen
    };

    // Initialize screen positions
    resetScreenPositions();

    // Gesture handling for screen transitions
    TouchGestures.onSwipe().subscribe((gesture) => {
        handleSwipeGesture(gesture, screens);
    });

    // Button handlers
    setupButtonHandlers(screens);
});

// Screen position management
function resetScreenPositions() {
    const screenPositions = {
        [UI_SCREENS.OPENING]: { x: 0, y: 0 },
        [UI_SCREENS.SETTINGS]: { x: 1, y: 0 },
        [UI_SCREENS.MAIN]: { x: 2, y: 0 }
    };

    Object.entries(screenPositions).forEach(([screen, pos]) => {
        screens[screen].transform.x = pos.x * Scene.width;
        screens[screen].transform.y = pos.y;
    });
}

// Transition animations
function animateScreenTransition(fromScreen, toScreen) {
    const driver = Animation.timeDriver({ durationMilliseconds: 300 });
    const samplerX = Animation.samplers.easeInOutCubic(
        fromScreen.transform.x.pinLastValue(),
        toScreen.transform.x.pinLastValue()
    );
    
    const animation = Animation.animate(driver, samplerX);
    fromScreen.transform.x = animation;
    
    driver.start();
    currentScreen = toScreen;
}

// Swipe gesture handler
function handleSwipeGesture(gesture, screens) {
    const SWIPE_THRESHOLD = 0.5;
    
    if (Math.abs(gesture.translation.x) > SWIPE_THRESHOLD) {
        const direction = gesture.translation.x > 0 ? 'right' : 'left';
        const transitions = {
            [UI_SCREENS.OPENING]: {
                left: UI_SCREENS.SETTINGS,
                right: null
            },
            [UI_SCREENS.SETTINGS]: {
                left: UI_SCREENS.MAIN,
                right: UI_SCREENS.OPENING
            },
            [UI_SCREENS.MAIN]: {
                left: null,
                right: UI_SCREENS.SETTINGS
            }
        };

        const nextScreen = transitions[currentScreen][direction];
        if (nextScreen) {
            animateScreenTransition(screens[currentScreen], screens[nextScreen]);
        }
    }
}

// Button handlers
function setupButtonHandlers(screens) {
    // Language selection
    ['English', 'Español', 'Français'].forEach(lang => {
        const button = screens[UI_SCREENS.SETTINGS].findFirst(`${lang.toLowerCase()}-button`);
        button.tap.subscribe(() => {
            settings.language = lang;
            updateUILanguage(lang);
        });
    });

    // Settings toggles
    const dyslexiaToggle = screens[UI_SCREENS.SETTINGS].findFirst('dyslexia-toggle');
    dyslexiaToggle.tap.subscribe(() => {
        settings.dyslexiaMode = !settings.dyslexiaMode;
        updateDyslexiaMode();
    });

    const lyricsToggle = screens[UI_SCREENS.SETTINGS].findFirst('lyrics-toggle');
    lyricsToggle.tap.subscribe(() => {
        settings.showLyrics = !settings.showLyrics;
        updateLyricsVisibility();
    });

    // Start button
    const startButton = screens[UI_SCREENS.OPENING].findFirst('start-button');
    startButton.tap.subscribe(() => {
        animateScreenTransition(screens[UI_SCREENS.OPENING], screens[UI_SCREENS.SETTINGS]);
    });

    // Begin button
    const beginButton = screens[UI_SCREENS.SETTINGS].findFirst('begin-button');
    beginButton.tap.subscribe(() => {
        animateScreenTransition(screens[UI_SCREENS.SETTINGS], screens[UI_SCREENS.MAIN]);
        initMainExperience();
    });
}

// UI Updates
function updateUILanguage(language) {
    const translations = {
        'English': {
            startButton: 'Get Started',
            beginButton: 'Begin Experience',
            dyslexiaMode: 'Dyslexia-friendly mode',
            showLyrics: 'Show lyrics'
        },
        'Español': {
            startButton: 'Comenzar',
            beginButton: 'Iniciar Experiencia',
            dyslexiaMode: 'Modo para dislexia',
            showLyrics: 'Mostrar letra'
        },
        'Français': {
            startButton: 'Commencer',
            beginButton: 'Démarrer l\'expérience',
            dyslexiaMode: 'Mode dyslexie',
            showLyrics: 'Afficher paroles'
        }
    };

    const texts = translations[language];
    Object.entries(texts).forEach(([key, value]) => {
        Patches.setStringValue(`${key}Text`, value);
    });
}

function updateDyslexiaMode() {
    const dyslexiaFont = Materials.findFirst('dyslexia-font');
    const regularFont = Materials.findFirst('regular-font');
    
    screens[UI_SCREENS.MAIN].material = settings.dyslexiaMode ? dyslexiaFont : regularFont;
}

function updateLyricsVisibility() {
    const lyricsContainer = Scene.root.findFirst('lyrics-container');
    lyricsContainer.hidden = !settings.showLyrics;
}

// Main experience initialization
function initMainExperience() {
    // Initialize camera and zoom functionality from the existing code
    const camera = CameraInfo.main;
    let currentZoom = 1.0;
    
    // Start the performer detection and zoom update loop
    update();
}

// Mock data for testing
const MOCK_LYRICS = [
    { text: "Is this the real life?", timestamp: 0, duration: 3000 },
    { text: "Is this just fantasy?", timestamp: 3000, duration: 3000 },
    { text: "Caught in a landslide", timestamp: 6000, duration: 3000 },
    { text: "No escape from reality", timestamp: 9000, duration: 3000 }
];

let currentLyricIndex = 0;
let isLyricsVisible = true;

// Initialize camera and zoom
const camera = CameraInfo.main;
let currentZoom = 1.0;
const MAX_ZOOM = 4.0;

// Mock performer detection (simplified for MVP)
function detectPerformer() {
    return {
        confidence: 0.8,
        boundingBox: {
            x: 0.4,
            y: 0.3,
            width: 0.2,
            height: 0.4
        },
        isPerformer: true
    };
}

// Zoom handling
function updateZoom(detection) {
    if (detection.confidence > 0.6) {
        const targetZoom = 2.5; // Fixed zoom for MVP
        currentZoom = targetZoom;
        camera.fov = 60 / currentZoom; // Adjust FOV for zoom effect
    }
}

// Lyrics display
const lyricsElement = document.getElementById('lyrics');

function updateLyrics() {
    if (currentLyricIndex < MOCK_LYRICS.length) {
        const lyric = MOCK_LYRICS[currentLyricIndex];
        lyricsElement.textContent = lyric.text;
        
        setTimeout(() => {
            currentLyricIndex++;
            updateLyrics();
        }, lyric.duration);
    }
}

// Gesture handling
TouchGestures.onSwipe().subscribe((gesture) => {
    if (gesture.direction.y < 0) { // Swipe down
        isLyricsVisible = !isLyricsVisible;
        lyricsElement.classList.toggle('lyrics-hidden');
    }
});

// Main loop
function update() {
    const detection = detectPerformer();
    updateZoom(detection);
    requestAnimationFrame(update);
}

// Start the application
function init() {
    // Load saved settings if they exist
    Persistence.userScope.get('userSettings').then(savedSettings => {
        if (savedSettings) {
            settings = { ...settings, ...savedSettings };
            updateUILanguage(settings.language);
            updateDyslexiaMode();
            updateLyricsVisibility();
        }
    });
}

init(); 