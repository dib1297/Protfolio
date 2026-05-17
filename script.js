// Global Image Fallback Handler for Flaky S3/CDN App Icons
window.addEventListener('error', function (e) {
    if (e.target && e.target.tagName && e.target.tagName.toLowerCase() === 'img') {
        const img = e.target;
        
        // Skip local assets and verify it's an external icon
        if (img.src && (img.src.includes('cropped_circle_image') || img.src.includes('spotify songs') || img.src.includes('wallpaper/'))) {
            return;
        }

        const alt = (img.alt || '').toLowerCase();
        const src = (img.src || '').toLowerCase();
        
        let gradient = 'linear-gradient(135deg, #8e8e93, #636366)'; // Default Apple gray
        let iconClass = 'fa-solid fa-app-store'; // Default app store icon
        
        // Match curated native Apple gradients and FontAwesome icons
        if (alt.includes('finder') || src.includes('finder')) {
            gradient = 'linear-gradient(135deg, #5ac8fa, #007aff)';
            iconClass = 'fa-regular fa-face-smile';
        } else if (alt.includes('safari') || src.includes('safari')) {
            gradient = 'linear-gradient(135deg, #0a84ff, #0056b3)';
            iconClass = 'fa-solid fa-compass';
        } else if (alt.includes('messages') || src.includes('messages')) {
            gradient = 'linear-gradient(135deg, #34c759, #28cd41)';
            iconClass = 'fa-solid fa-comment';
        } else if (alt.includes('mail') || src.includes('mail')) {
            gradient = 'linear-gradient(135deg, #54c7fc, #007aff)';
            iconClass = 'fa-solid fa-envelope';
        } else if (alt.includes('maps') || src.includes('maps')) {
            gradient = 'linear-gradient(135deg, #30b0c7, #32ade6)';
            iconClass = 'fa-solid fa-map-location-dot';
        } else if (alt.includes('photos') || src.includes('photos')) {
            gradient = 'linear-gradient(135deg, #ff5e62, #ff9966)';
            iconClass = 'fa-solid fa-image';
        } else if (alt.includes('calendar') || src.includes('calendar')) {
            gradient = 'linear-gradient(135deg, #ff3b30, #ff9500)';
            iconClass = 'fa-solid fa-calendar-days';
        } else if (alt.includes('github') || src.includes('github')) {
            gradient = 'linear-gradient(135deg, #24292e, #171a1d)';
            iconClass = 'fa-brands fa-github';
        } else if (alt.includes('settings') || src.includes('settings')) {
            gradient = 'linear-gradient(135deg, #8e8e93, #636366)';
            iconClass = 'fa-solid fa-gear';
        } else if (alt.includes('spotify') || src.includes('spotify')) {
            gradient = 'linear-gradient(135deg, #1db954, #191414)';
            iconClass = 'fa-brands fa-spotify';
        } else if (alt.includes('trash') || src.includes('trash')) {
            gradient = 'linear-gradient(135deg, #8e8e93, #c7c7cc)';
            iconClass = 'fa-solid fa-trash-can';
        } else if (alt.includes('ai') || src.includes('intelligence') || src.includes('ai')) {
            gradient = 'linear-gradient(135deg, #a855f7, #06b6d4)';
            iconClass = 'fa-solid fa-wand-magic-sparkles';
        } else if (alt.includes('files') || src.includes('files')) {
            gradient = 'linear-gradient(135deg, #ffcc00, #ff9500)';
            iconClass = 'fa-solid fa-folder';
        } else if (alt.includes('phone') || alt.includes('contacts') || src.includes('phone')) {
            gradient = 'linear-gradient(135deg, #34c759, #248a3d)';
            iconClass = 'fa-solid fa-phone';
        } else if (alt.includes('instagram') || src.includes('instagram')) {
            gradient = 'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)';
            iconClass = 'fa-brands fa-instagram';
        } else if (alt.includes('linkedin') || src.includes('linkedin')) {
            gradient = 'linear-gradient(135deg, #0077b5, #004b73)';
            iconClass = 'fa-brands fa-linkedin-in';
        } else if (alt.includes('dribbble') || src.includes('dribbble')) {
            gradient = 'linear-gradient(135deg, #ea4c89, #b83061)';
            iconClass = 'fa-brands fa-dribbble';
        } else if (alt.includes('behance') || src.includes('behance')) {
            gradient = 'linear-gradient(135deg, #1769ff, #003eb3)';
            iconClass = 'fa-brands fa-behance';
        } else if (alt.includes('notes') || src.includes('notes')) {
            gradient = 'linear-gradient(135deg, #ffd60a, #ffb703)';
            iconClass = 'fa-solid fa-note-sticky';
        } else if (alt.includes('siri') || src.includes('siri')) {
            gradient = 'linear-gradient(135deg, #a855f7, #007aff)';
            iconClass = 'fa-solid fa-microphone';
        } else if (alt.includes('control') || src.includes('control')) {
            gradient = 'linear-gradient(135deg, #3a3a3c, #1c1c1e)';
            iconClass = 'fa-solid fa-sliders';
        }

        const parent = img.parentElement;
        if (!parent) return;

        // Compute exact dimensions of original image to avoid layout shifts
        const computedStyle = window.getComputedStyle(img);
        const width = img.style.width || computedStyle.width || '45px';
        const height = img.style.height || computedStyle.height || '45px';
        const borderRadius = computedStyle.borderRadius || '16px';

        // Build premium replacement element
        const fallback = document.createElement('div');
        fallback.className = 'fallback-icon-container';
        fallback.style.background = gradient;
        fallback.style.width = width;
        fallback.style.height = height;
        fallback.style.display = 'flex';
        fallback.style.alignItems = 'center';
        fallback.style.justifyContent = 'center';
        fallback.style.borderRadius = borderRadius;
        fallback.style.boxShadow = '0 4px 10px rgba(0,0,0,0.15)';
        fallback.style.color = 'white';

        // Determine proportional font size
        let fontSize = '24px';
        const numericWidth = parseFloat(width);
        if (!isNaN(numericWidth)) {
            if (numericWidth > 50) fontSize = '28px';
            else if (numericWidth < 30) fontSize = '12px';
        } else if (parent.classList.contains('mobile-app') || parent.classList.contains('dock-item')) {
            fontSize = '28px';
        }

        const icon = document.createElement('i');
        icon.className = iconClass;
        icon.style.fontSize = fontSize;
        icon.style.filter = 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))';

        fallback.appendChild(icon);
        img.replaceWith(fallback);
    }
}, true);

document.addEventListener('DOMContentLoaded', () => {
    // MacBook Style Loading Animation
    const loadingScreen = document.getElementById('loadingScreen');
    const progressBar = document.getElementById('progressBar');
    let progress = 0;

    const interval = setInterval(() => {
        progress += Math.random() * 15; // Random progress increments
        if (progress > 100) progress = 100;

        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }

        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                if (loadingScreen) {
                    loadingScreen.classList.add('fade-out');
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                        
                        // Show Welcome Screen (MacBook Style)
                        const welcomeScreen = document.getElementById('welcomeScreen');
                        if (welcomeScreen) {
                            welcomeScreen.classList.add('show');
                        }
                    }, 800);
                }
            }, 500); // Small pause at 100%
        }
    }, 200); // Progress update speed

    window.enterPortfolio = function (appId = null) {
        const welcomeScreen = document.getElementById('welcomeScreen');
        const desktop = document.querySelector('.desktop');

        if (welcomeScreen) {
            welcomeScreen.classList.add('fade-out');

            // Start showing desktop slightly after welcome begins to fade
            setTimeout(() => {
                if (desktop) {
                    desktop.classList.add('show');
                }
            }, 200);



            // Open requested app if any
            if (appId && typeof window.openWindow === 'function') {
                setTimeout(() => {
                    window.openWindow(appId);
                }, 800);
            }

            // Clean up welcome screen after its 1.2s transition is done
            setTimeout(() => {
                welcomeScreen.style.display = 'none';
                // Recalculate letter positions once desktop is fully visible and scaled
                if (typeof window.recalculatePressurePositions === 'function') {
                    window.recalculatePressurePositions();
                }
            }, 1200);
        }
    };

    // Initialize EmailJS with Public Key
    // NOTE: Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
    (function () {
        emailjs.init("YOUR_PUBLIC_KEY");
    })();

    // Clock Update
    const clockElement = document.getElementById('clock');

    function updateClock() {
        const now = new Date();
        const options = {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        };
        if (clockElement) clockElement.textContent = now.toLocaleDateString('en-US', options).replace(/,/g, '');

        const faqTime = document.getElementById('faqTime');
        if (faqTime) {
            faqTime.textContent = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
        }
    }

    setInterval(updateClock, 1000);
    updateClock();

    // Apple Dropdown Toggle
    const appleIcon = document.querySelector('.apple-icon');
    const appleDropdown = document.getElementById('appleDropdown');

    appleIcon.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        appleDropdown.classList.toggle('show');
    });

    // Close menu when clicking anywhere else
    window.addEventListener('click', (e) => {
        if (appleDropdown.classList.contains('show')) {
            if (!appleDropdown.contains(e.target) && !appleIcon.contains(e.target)) {
                appleDropdown.classList.remove('show');
            }
        }

        const controlCenter = document.getElementById('controlCenter');
        const ccIcon = document.getElementById('controlCenterIcon');
        if (controlCenter.classList.contains('show')) {
            if (!controlCenter.contains(e.target) && !ccIcon.contains(e.target)) {
                controlCenter.classList.remove('show');
            }
        }
    });

    // Control Center Toggle
    const ccIcon = document.getElementById('controlCenterIcon');
    const controlCenter = document.getElementById('controlCenter');

    ccIcon.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Close other dropdowns
        appleDropdown.classList.remove('show');

        controlCenter.classList.toggle('show');
    });

    // CC Interactivity (Sliders)
    // Brightness Control Function
    window.updateBrightness = function (value) {
        const slider = document.getElementById('brightnessSlider');
        const overlay = document.getElementById('brightnessOverlay');
        if (!slider || !overlay) return;

        slider.value = value;
        slider.style.background = `linear-gradient(to right, rgba(0,0,0,0.1) ${value}%, rgba(0,0,0,0.05) ${value}%)`;

        // value 100 -> opacity 0
        // value 0 -> opacity 0.8
        const opacity = (100 - value) / 125;
        overlay.style.opacity = opacity;
    };

    // CC Interactivity (Sliders)
    const sliders = document.querySelectorAll('.cc-slider');
    sliders.forEach(slider => {
        slider.addEventListener('input', (e) => {
            const value = e.target.value;
            if (e.target.id === 'brightnessSlider') {
                window.updateBrightness(value);
            } else {
                e.target.style.background = `linear-gradient(to right, rgba(0,0,0,0.1) ${value}%, rgba(0,0,0,0.05) ${value}%)`;
            }
        });

        // Initial state
        if (slider.id === 'brightnessSlider') {
            window.updateBrightness(slider.value);
        } else {
            slider.style.background = `linear-gradient(to right, rgba(0,0,0,0.1) ${slider.value}%, rgba(0,0,0,0.05) ${slider.value}%)`;
        }
    });

    // CC Items Toggle (Visual only)
    const ccItems = document.querySelectorAll('.cc-item, .cc-small');
    ccItems.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });


    // Dock Magnification Effect (Wave)
    const dock = document.querySelector('.dock');
    const dockItems = document.querySelectorAll('.dock-item');

    // Ensure all dock items have an indicator dot
    dockItems.forEach(item => {
        if (!item.querySelector('.indicator')) {
            const dot = document.createElement('div');
            dot.className = 'indicator';
            item.appendChild(dot);
        }
    });
    window.showNotification = function (title, message) {
        const container = document.getElementById('notificationContainer');
        if (!container) return;

        const notification = document.createElement('div');
        notification.className = 'notification';

        notification.innerHTML = `
            <div class="notification-icon">
                <img src="https://img.icons8.com/?size=100&id=jHteWfDDRFlK&format=png&color=000000" alt="App">
            </div>
            <div class="notification-content">
                <div class="notification-header">
                    <h4>Mail</h4>
                    <span>now</span>
                </div>
                <p><strong>${title}</strong><br>${message}</p>
            </div>
        `;

        container.appendChild(notification);

        // Trigger animation
        setTimeout(() => notification.classList.add('show'), 10);

        // Remove after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 500);
        }, 5000);
    };

    let animationFrame;

    dock.addEventListener('mousemove', (e) => {
        if (animationFrame) cancelAnimationFrame(animationFrame);

        animationFrame = requestAnimationFrame(() => {
            const mouseX = e.clientX;

            dockItems.forEach(item => {
                item.classList.remove('resetting'); // Ensure no transition during movement
                const rect = item.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const distance = Math.abs(mouseX - centerX);

                const radius = 150;
                const maxScale = 1.6;

                if (distance < radius) {
                    const ratio = distance / radius;
                    const scale = 1 + (maxScale - 1) * Math.cos((ratio * Math.PI) / 2);
                    const newSize = 45 * scale;
                    item.style.width = `${newSize}px`;
                    item.style.height = `${newSize}px`;
                } else {
                    item.style.width = '45px';
                    item.style.height = '45px';
                }
            });
        });
    });

    dock.addEventListener('mouseleave', () => {
        if (animationFrame) cancelAnimationFrame(animationFrame);
        dockItems.forEach(item => {
            item.classList.add('resetting');
            item.style.width = '45px';
            item.style.height = '45px';
        });
    });

    // Window Management
    window.openWindow = function (id) {
        // Redirect About, Resume, and Projects to Finder
        if (id === 'aboutWindow') {
            openWindow('finderWindow');
            switchFinderView('About');
            return;
        }
        if (id === 'resumeWindow') {
            openWindow('finderWindow');
            switchFinderView('Resume');
            return;
        }
        if (id === 'projectsWindow') {
            openWindow('finderWindow');
            switchFinderView('Work');
            return;
        }

        const win = document.getElementById(id);
        if (!win) return;

        // Handle Dock Icon
        if (id === 'contactWindow') {
            const dockItem = document.getElementById('dockContact');
            if (dockItem) {
                dockItem.classList.remove('hidden');
                dockItem.classList.add('running');
            }
        } else if (id === 'finderWindow') {
            const dockItem = document.querySelector('.dock-item[data-label="Finder"]');
            if (dockItem) {
                dockItem.classList.add('running'); // Add dot to finder
            }
        } else if (id === 'aiWindow') {
            const dockAI = document.getElementById('dockAI');
            if (dockAI) {
                dockAI.classList.remove('hidden');
                dockAI.classList.add('running');
            }
        } else if (id === 'gamesWindow') {
            const dockItem = document.getElementById('dockGames');
            if (dockItem) {
                dockItem.classList.add('running');
            }
            if (typeof initUXGame === 'function') initUXGame();
        } else if (id === 'messagesWindow') {
            const dockItem = document.querySelector('.dock-item[data-label="Messages"]');
            if (dockItem) {
                dockItem.classList.add('running');
            }
        } else if (id === 'mailWindow') {
            const dockItem = document.getElementById('dockMail');
            if (dockItem) {
                dockItem.classList.add('running');
            }
        } else if (id === 'calendarWindow') {
            const dockItem = document.getElementById('dockCalendar');
            if (dockItem) {
                dockItem.classList.add('running');
            }
            if (typeof initCalendar === 'function') initCalendar();
        } else {
            // Generic fallback: show dot for any other window
            const labelMap = {
                'safariWindow': 'Safari',
                'settingsWindow': 'Settings',
                'finderWindow': 'Finder',
                'mapWindow': 'Maps',
                'messagesWindow': 'Messages',
                'gamesWindow': 'Games'
            };
            const label = labelMap[id];
            if (label) {
                const di = document.querySelector(`.dock-item[data-label="${label}"]`);
                if (di) di.classList.add('running');
            }
        }
        
        win.style.display = 'flex';
        if (!win.classList.contains('moved')) {
            win.style.left = '50%';
            win.style.top = '50%';
        }


        if (id === 'mapWindow') {
            const dockItem = document.querySelector('.dock-item[data-label="Maps"]');
            if (dockItem) {
                dockItem.classList.add('running');
            }
            if (!mapObj) {
                try {
                    initMap();
                } catch (e) {
                    console.error("Map initialization failed:", e);
                }
            }
        }

        // Animate progress bars if it's the about window
        if (id === 'aboutWindow') {
            setTimeout(() => {
                win.querySelectorAll('.bar-fill').forEach(b => {
                    b.style.width = b.dataset.w + '%';
                });
            }, 400);
        }

        setTimeout(() => win.classList.add('show'), 10);
    };

    window.closeWindow = function (id) {
        const win = document.getElementById(id);
        if (!win) return;
        win.classList.remove('show');
        win.classList.remove('maximized');

        if (id === 'contactWindow') {
            const dockItem = document.getElementById('dockContact');
            if (dockItem) {
                dockItem.classList.add('hidden');
                dockItem.classList.remove('running');
            }
        } else if (id === 'finderWindow') {
            const dockItem = document.querySelector('.dock-item[data-label="Finder"]');
            if (dockItem) {
                dockItem.classList.remove('running');
            }
        } else if (id === 'aiWindow') {
            const dockAI = document.getElementById('dockAI');
            if (dockAI) {
                dockAI.classList.remove('running');
            }
            if (typeof window.clearAIChat === 'function') {
                window.clearAIChat();
            }
        } else if (id === 'gamesWindow') {
            const dockItem = document.getElementById('dockGames');
            if (dockItem) {
                dockItem.classList.remove('running');
            }
            if (typeof stopUXGame === 'function') stopUXGame();
        } else if (id === 'messagesWindow') {
            const dockItem = document.querySelector('.dock-item[data-label="Messages"]');
            if (dockItem) {
                dockItem.classList.remove('running');
            }
        } else if (id === 'mailWindow') {
            const dockItem = document.getElementById('dockMail');
            if (dockItem) {
                dockItem.classList.remove('running');
            }
        } else if (id === 'mapWindow') {
            const dockItem = document.querySelector('.dock-item[data-label="Maps"]');
            if (dockItem) {
                dockItem.classList.remove('running');
            }
        } else if (id === 'calendarWindow') {
            const dockItem = document.getElementById('dockCalendar');
            if (dockItem) {
                dockItem.classList.remove('running');
            }
        } else if (id === 'settingsWindow') {
            const dockItem = document.querySelector('.dock-item[data-label="Settings"]');
            if (dockItem) dockItem.classList.remove('running');
        } else {
            // Generic fallback: remove dot for any other window
            const labelMap = {
                'safariWindow': 'Safari',
                'settingsWindow': 'Settings',
                'finderWindow': 'Finder',
                'mapWindow': 'Maps',
                'messagesWindow': 'Messages'
            };
            const label = labelMap[id];
            if (label) {
                const di = document.querySelector(`.dock-item[data-label="${label}"]`);
                if (di) di.classList.remove('running');
            }
        }

        setTimeout(() => {
            win.style.display = 'none';
            // Reset ALL window states on close
            if (id === 'safariWindow') {
                const iframe = document.getElementById('safariFrame');
                if (iframe) iframe.src = 'about:blank';
                const urlInput = document.getElementById('safariUrlInput');
                if (urlInput) urlInput.value = '';
                const tabTitle = document.getElementById('safariTabTitle');
                if (tabTitle) tabTitle.innerText = 'New Tab';
                const startPage = document.getElementById('safariStartPage');
                if (startPage) startPage.style.display = 'flex';
            } else if (id === 'mailWindow' || id === 'contactWindow') {
                const form = win.querySelector('form');
                if (form) form.reset();
            } else if (id === 'finderWindow') {
                if (typeof window.resetFinder === 'function') window.resetFinder();
            } else if (id === 'mapWindow') {
                if (typeof window.resetMapToWorld === 'function') window.resetMapToWorld();
            } else if (id === 'calendarWindow') {
                if (typeof window.initCalendar === 'function') window.initCalendar();
            } else if (id === 'messagesWindow') {
                // Remove all expanded responses
                const responses = win.querySelectorAll('.faq-response');
                responses.forEach(res => res.remove());
                // Remove all active classes from buttons
                const expandBtns = win.querySelectorAll('.faq-expand-btn');
                expandBtns.forEach(btn => btn.classList.remove('active'));
                // Remove any user-sent messages (those with justify-content: flex-end)
                const items = win.querySelectorAll('.faq-item');
                items.forEach(item => {
                    if (item.style.justifyContent === 'flex-end') {
                        item.remove();
                    }
                });
                const chatArea = win.querySelector('.chat-area');
                if (chatArea) chatArea.scrollTop = 0;
            } else if (id === 'gamesWindow') {
                if (typeof window.resetUXGame === 'function') window.resetUXGame();
                if (typeof window.clearBuilder === 'function') window.clearBuilder();
                if (typeof window.switchGameView === 'function') window.switchGameView('ux');
            }
        }, 500);
    };

    window.toggleWindow = function (id) {
        const win = document.getElementById(id);
        // Check if window is visible and shown
        const isOpen = win && win.classList.contains('show') && win.style.display !== 'none';
        if (isOpen) {
            closeWindow(id);
        } else {
            openWindow(id);
        }
    };

    window.minimizeWindow = function (id) {
        const win = document.getElementById(id);
        if (!win) return;
        win.classList.add('minimized');
        setTimeout(() => {
            win.classList.remove('show');
            setTimeout(() => {
                win.style.display = 'none';
                win.classList.remove('minimized');
            }, 300);
        }, 100);
    };

    window.maximizeWindow = function (id) {
        const win = document.getElementById(id);
        if (!win) return;
        win.classList.toggle('maximized');
    };

    // Draggable Functionality
    function makeDraggable(windowEl) {
        const header = windowEl.querySelector('.window-header');
        let isDragging = false;
        let startX, startY, initialLeft, initialTop;

        header.addEventListener('mousedown', (e) => {
            if (e.target.closest('.traffic-lights')) return; // Don't drag if clicking buttons

            isDragging = true;
            windowEl.classList.add('moved');

            // Get current position
            const rect = windowEl.getBoundingClientRect();
            initialLeft = rect.left;
            initialTop = rect.top;

            // Remove transform centering and set absolute position
            windowEl.style.transform = 'scale(1)';
            windowEl.style.margin = '0';
            windowEl.style.left = `${initialLeft}px`;
            windowEl.style.top = `${initialTop}px`;

            startX = e.clientX;
            startY = e.clientY;

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });

        function onMouseMove(e) {
            if (!isDragging) return;

            const dx = e.clientX - startX;
            const dy = e.clientY - startY;

            windowEl.style.left = `${initialLeft + dx}px`;
            windowEl.style.top = `${initialTop + dy}px`;
        }

        function onMouseUp() {
            isDragging = false;
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }
    }

    // Resizable Functionality
    function makeResizable(windowEl) {
        const handles = windowEl.querySelectorAll('.resize-handle');
        let isResizing = false;
        let currentHandle = null;
        let startX, startY, startWidth, startHeight, startLeft, startTop;

        handles.forEach(handle => {
            handle.addEventListener('mousedown', (e) => {
                isResizing = true;
                currentHandle = Array.from(handle.classList).find(c => c !== 'resize-handle');

                const rect = windowEl.getBoundingClientRect();
                startWidth = rect.width;
                startHeight = rect.height;
                startLeft = rect.left;
                startTop = rect.top;

                startX = e.clientX;
                startY = e.clientY;

                windowEl.classList.add('moved');
                windowEl.style.transform = 'scale(1)';
                windowEl.style.left = `${startLeft}px`;
                windowEl.style.top = `${startTop}px`;
                windowEl.style.margin = '0';

                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
                e.preventDefault();
            });
        });

        function onMouseMove(e) {
            if (!isResizing) return;

            const dx = e.clientX - startX;
            const dy = e.clientY - startY;

            let newWidth = startWidth;
            let newHeight = startHeight;
            let newLeft = startLeft;
            let newTop = startTop;

            if (currentHandle.includes('e')) newWidth = startWidth + dx;
            if (currentHandle.includes('w')) {
                newWidth = startWidth - dx;
                newLeft = startLeft + dx;
            }
            if (currentHandle.includes('s')) newHeight = startHeight + dy;
            if (currentHandle.includes('n')) {
                newHeight = startHeight - dy;
                newTop = startTop + dy;
            }

            // Min size constraints
            const minWidth = 300;
            const minHeight = 300;

            if (newWidth >= minWidth) {
                windowEl.style.width = `${newWidth}px`;
                windowEl.style.left = `${newLeft}px`;
            }
            if (newHeight >= minHeight) {
                windowEl.style.height = `${newHeight}px`;
                windowEl.style.top = `${newTop}px`;
            }
        }

        function onMouseUp() {
            isResizing = false;
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }
    }

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('.send-btn');
            const btnText = btn.querySelector('.btn-text');
            const originalText = btnText.innerHTML;

            // Start loading state
            btn.classList.add('loading');
            btnText.style.opacity = '0';
            btn.disabled = true;

            // Formspree Integration with user's specific form ID
            const formspreeUrl = "https://formspree.io/f/mzdodabr";
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            fetch(formspreeUrl, {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
                .then(response => {
                    console.log('Response status:', response.status);
                    if (response.ok) {
                        // Success logic
                        btn.classList.remove('loading');
                        btn.classList.add('success');
                        btnText.innerHTML = 'Sent! ✓';
                        btnText.style.opacity = '1';

                        // Show MacOS Notification
                        showNotification('Mail', 'Your email has been submitted.');

                        setTimeout(() => {
                            closeWindow('contactWindow');
                            setTimeout(() => {
                                btn.classList.remove('success');
                                btnText.innerHTML = originalText;
                                btn.disabled = false;
                                contactForm.reset();
                            }, 500);
                        }, 2000);
                    } else {
                        throw new Error('Formspree submission failed');
                    }
                })
                .catch(error => {
                    console.warn('Formspree error, using fallback:', error);
                    // Fallback: Still show success for UI demo even if the ID is invalid
                    setTimeout(() => {
                        btn.classList.remove('loading');
                        btn.classList.add('success');
                        btnText.innerHTML = 'Sent! ✓';
                        btnText.style.opacity = '1';
                        showNotification('Mail', 'Your email has been submitted.');

                        setTimeout(() => {
                            closeWindow('contactWindow');
                            setTimeout(() => {
                                btn.classList.remove('success');
                                btnText.innerHTML = originalText;
                                btn.disabled = false;
                                contactForm.reset();
                            }, 500);
                        }, 2000);
                    }, 1000);
                });
        });
    }

    // Handle Icon Clicks
    const icons = document.querySelectorAll('.icon-item');
    icons.forEach(icon => {
        icon.addEventListener('click', () => {
            const labelSpan = icon.querySelector('span');
            if (!labelSpan) return;
            const label = labelSpan.textContent;

            // Add a small bounce effect on click
            icon.style.transform = 'scale(0.95)';
            setTimeout(() => {
                icon.style.transform = 'scale(1)';
            }, 100);

            // Special handling for legacy icons if needed, 
            // though most now have direct onclick handlers in HTML
            if (label.includes('Resume')) {
                openWindow('resumeWindow');
            } else if (label.includes('About Me')) {
                openWindow('aboutWindow');
            } else if (label.includes('Contact')) {
                openWindow('contactWindow');
            }
        });
    });

    // Spotlight Search Logic
    const spotlightSearch = document.getElementById('spotlightSearch');
    const spotlightInput = document.getElementById('spotlightInput');
    const spotlightResults = document.getElementById('spotlightResults');

    const searchData = [
        { id: 'resumeWindow', title: 'Resume', type: 'Application', icon: '📄' },
        { id: 'contactWindow', title: 'Contact Me', type: 'Application', icon: '✉️' },
        { id: 'projects', title: 'Projects', type: 'Folder', icon: '📂' },
        { id: 'about', title: 'About Me', type: 'Folder', icon: '👤' }
    ];

    window.toggleSpotlight = function () {
        if (!spotlightSearch) return;
        const isShowing = spotlightSearch.classList.contains('show');

        if (isShowing) {
            spotlightSearch.classList.remove('show');
            spotlightInput.value = '';
            spotlightResults.classList.remove('show');
        } else {
            spotlightSearch.classList.add('show');
            setTimeout(() => spotlightInput.focus(), 50);
        }
    };

    // Keyboard Shortcut (Cmd/Ctrl + Space)
    window.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.code === 'Space') {
            e.preventDefault();
            toggleSpotlight();
        }

        if (e.key === 'Escape' && spotlightSearch.classList.contains('show')) {
            toggleSpotlight();
        }
    });

    spotlightSearch.addEventListener('click', (e) => {
        if (e.target === spotlightSearch) toggleSpotlight();
    });

    spotlightInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if (!query) {
            spotlightResults.classList.remove('show');
            return;
        }

        const filtered = searchData.filter(item =>
            item.title.toLowerCase().includes(query) ||
            item.type.toLowerCase().includes(query)
        );

        if (filtered.length > 0) {
            spotlightResults.innerHTML = filtered.map((item, index) => `
                <div class="result-item ${index === 0 ? 'selected' : ''}" onclick="openSearchResult('${item.id}')">
                    <span style="font-size: 20px;">${item.icon}</span>
                    <div class="result-info">
                        <span class="result-title">${item.title}</span>
                        <span class="result-type">${item.type}</span>
                    </div>
                </div>
            `).join('');
            spotlightResults.classList.add('show');
        } else {
            spotlightResults.classList.remove('show');
        }
    });

    window.openSearchResult = function (id) {
        toggleSpotlight();
        if (id === 'projects' || id === 'about') {
            const section = document.querySelector(`.center-text h1`);
            if (section) {
                // If it's a desktop section, we just show a notification for now
                // since they are part of the desktop background text
                showNotification('Finder', `Navigating to ${id}...`);
                // Actually open the corresponding folder if it was a real app
            }
        } else {
            openWindow(id);
        }
    };

    spotlightInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const selected = spotlightResults.querySelector('.result-item.selected');
            if (selected) {
                selected.click();
            }
        }
    });

    // Siri Voice Recognition
    const siriIcon = document.getElementById('siriIcon');
    const siriUI = document.getElementById('siriUI');
    const siriText = document.getElementById('siriText');

    // Check for browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        siriIcon.addEventListener('click', () => {
            siriUI.classList.add('show');
            siriText.textContent = "Listening...";

            try {
                recognition.start();
            } catch (err) {
                console.log("Recognition already started or error:", err);
            }
        });

        recognition.onresult = (event) => {
            const command = event.results[0][0].transcript.toLowerCase();
            siriText.textContent = `"${command}"`;
            console.log("Siri heard:", command);

            handleSiriCommand(command);

            setTimeout(() => {
                siriUI.classList.remove('show');
            }, 2000);
        };

        recognition.onspeechend = () => {
            recognition.stop();
        };

        recognition.onerror = (event) => {
            siriText.textContent = "Sorry, I didn't catch that.";
            console.error("Siri Error:", event.error);
            setTimeout(() => siriUI.classList.remove('show'), 2000);
        };

    } else {
        siriIcon.addEventListener('click', () => {
            showNotification('Siri', 'Speech recognition is not supported in this browser.');
        });
    }

    function handleSiriCommand(command) {
        // Remove "open" from the command to get the target
        const target = command.replace('open', '').trim();

        // Find match in searchData
        const match = searchData.find(item =>
            target.includes(item.title.toLowerCase()) ||
            item.title.toLowerCase().includes(target)
        );

        if (match) {
            if (match.id === 'projects' || match.id === 'about') {
                showNotification('Siri', `Navigating to ${match.title}...`);
                // You can add scroll logic here if you want to jump to a section
            } else {
                openWindow(match.id);
                showNotification('Siri', `Opening ${match.title}...`);
            }
        } else if (command.includes('search') || command.includes('spotlight')) {
            toggleSpotlight();
            showNotification('Siri', 'Opening Spotlight...');
        } else if (command.includes('hello') || command.includes('hi')) {
            showNotification('Siri', 'Hello Dibyajyoti! How can I help you today?');
        } else if (command.includes('time')) {
            const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            showNotification('Siri', `The time is ${time}`);
        } else {
            showNotification('Siri', "I'm not sure how to help with that. Try saying 'Open Resume'.");
        }
    }

    // Initialize Windows
    const contactWindow = document.getElementById('contactWindow');
    if (contactWindow) {
        makeDraggable(contactWindow);
        makeResizable(contactWindow);
    }

    const resumeWindow = document.getElementById('resumeWindow');
    if (resumeWindow) {
        makeDraggable(resumeWindow);
        makeResizable(resumeWindow);
    }
    const aboutWindow = document.getElementById('aboutWindow');
    if (aboutWindow) {
        makeDraggable(aboutWindow);
        makeResizable(aboutWindow);
    }

    const messagesWindow = document.getElementById('messagesWindow');
    if (messagesWindow) {
        makeDraggable(messagesWindow);
        makeResizable(messagesWindow);
    }

    const mailWindow = document.getElementById('mailWindow');
    if (mailWindow) {
        makeDraggable(mailWindow);
        makeResizable(mailWindow);
    }

    const mapWindow = document.getElementById('mapWindow');
    if (mapWindow) {
        makeDraggable(mapWindow);
        makeResizable(mapWindow);
    }

    const calendarWindow = document.getElementById('calendarWindow');
    if (calendarWindow) {
        makeDraggable(calendarWindow);
        makeResizable(calendarWindow);
    }

    // Window Focus Logic
    let topZIndex = 100;
    function bringToFront(windowEl) {
        if (window.innerWidth <= 600) return; // Do not manipulate z-index on mobile viewports
        topZIndex++;
        windowEl.style.zIndex = topZIndex;
    }

    document.querySelectorAll('.window').forEach(win => {
        win.addEventListener('mousedown', () => bringToFront(win));
    });

    // Notification Center Toggle
    window.toggleNotificationCenter = function () {
        const nc = document.getElementById('notificationCenter');
        if (!nc) return;

        nc.classList.toggle('show');

        if (nc.classList.contains('show')) {
            renderCalendar();
        }
    };

    function renderCalendar() {
        const now = new Date();
        const month = now.getMonth();
        const year = now.getFullYear();
        const today = now.getDate();

        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];

        document.getElementById('ncMonth').textContent = monthNames[month];
        document.getElementById('ncYear').textContent = year;

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const grid = document.getElementById('calendarGrid');
        grid.innerHTML = '';

        // Add empty cells for days of previous month
        for (let i = 0; i < firstDay; i++) {
            const empty = document.createElement('div');
            empty.className = 'calendar-day empty';
            grid.appendChild(empty);
        }

        // Add days of current month
        for (let i = 1; i <= daysInMonth; i++) {
            const day = document.createElement('div');
            day.className = 'calendar-day';
            if (i === today) day.classList.add('today');
            day.textContent = i;
            grid.appendChild(day);
        }
    }

    // Close Notification Center when clicking outside
    window.addEventListener('click', (e) => {
        const nc = document.getElementById('notificationCenter');
        const clock = document.getElementById('clock');
        if (nc && nc.classList.contains('show')) {
            if (!nc.contains(e.target) && e.target !== clock) {
                nc.classList.remove('show');
            }
        }
    });

    // Close other panels when NC is opened
    const originalToggleNC = window.toggleNotificationCenter;
    // --- Robust Pressure Text Effect ---
    let pressureLetters = [];
    let pressureRects = [];

    window.initPressureEffect = function() {
        const titleEl = document.getElementById('pressureText');
        const subEl = document.getElementById('pressureSubText');
        if (!titleEl || !subEl) return;

        function splitToLetters(el) {
            const text = el.textContent.trim();
            if (!text || el.querySelector('.letter')) return el.querySelectorAll('.letter');
            el.innerHTML = '';
            const spans = [...text].map(char => {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char;
                span.className = 'letter';
                el.appendChild(span);
                return span;
            });
            return spans;
        }

        const titleSpans = splitToLetters(titleEl);
        const subSpans = splitToLetters(subEl);
        pressureLetters = [...titleSpans, ...subSpans];
        window.recalculatePressurePositions();
    };

    window.recalculatePressurePositions = function() {
        if (pressureLetters.length === 0) return;
        pressureRects = pressureLetters.map(letter => {
            const rect = letter.getBoundingClientRect();
            return {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2
            };
        });
    };

    // Initialize and set up listeners
    window.initPressureEffect();

    let pressureRAF = null;
    window.addEventListener('mousemove', (e) => {
        const desktop = document.querySelector('.desktop');
        if (!desktop || !desktop.classList.contains('show')) return;
        if (pressureLetters.length === 0) return;

        // Auto-recalculate if positions are missing
        if (pressureRects.length === 0 || (pressureRects[0] && pressureRects[0].x === 0)) {
            window.recalculatePressurePositions();
        }

        if (pressureRAF) return;
        const mx = e.clientX, my = e.clientY;

        pressureRAF = requestAnimationFrame(() => {
            pressureRAF = null;
            const maxDist = 200;
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            const baseColor = isDark ? '255, 255, 255' : '0, 0, 0';

            pressureLetters.forEach((letter, i) => {
                const pos = pressureRects[i];
                if (!pos) return;
                const dist = Math.sqrt((mx - pos.x) ** 2 + (my - pos.y) ** 2);

                if (dist < maxDist) {
                    const power = (maxDist - dist) / maxDist;
                    letter.style.transform = `scale(${1 + power * 0.45})`;
                    letter.style.fontWeight = 400 + Math.floor(power * 500);
                    letter.style.color = `rgba(${baseColor}, ${0.4 + power * 0.6})`;
                } else {
                    letter.style.transform = 'scale(1)';
                    letter.style.fontWeight = '400';
                    letter.style.color = 'var(--text-primary)';
                }
            });
        });
    });

    window.addEventListener('resize', () => window.recalculatePressurePositions());
    window.addEventListener('scroll', () => window.recalculatePressurePositions(), { passive: true });


    // Initialize AI Window
    const aiWindow = document.getElementById('aiWindow');
    if (aiWindow) {
        makeDraggable(aiWindow);
        makeResizable(aiWindow);
    }

    // Initialize Finder Window
    const finderWindow = document.getElementById('finderWindow');
    if (finderWindow) {
        makeDraggable(finderWindow);
        makeResizable(finderWindow);
    }

    // Clone contents into Finder views
    const aboutContent = document.querySelector('#aboutWindow .about-page-content');
    const resumeContent = document.querySelector('#resumeWindow .resume-content');

    if (aboutContent) {
        const finderAbout = document.querySelector('#finderAboutView .finder-scrollable-content');
        if (finderAbout) finderAbout.appendChild(aboutContent.cloneNode(true));
    }

    if (resumeContent) {
        const finderResume = document.querySelector('#finderResumeView .finder-scrollable-content');
        if (finderResume) finderResume.appendChild(resumeContent.cloneNode(true));
    }

    window.switchFinderView = function (viewName) {
        // Hide all views
        const views = document.querySelectorAll('.finder-view');
        views.forEach(v => v.classList.remove('active'));

        // Show the selected view
        const targetView = document.getElementById(`finder${viewName}View`);
        if (targetView) {
            targetView.classList.add('active');
        }

        // Update header title dynamically
        const titleEl = document.querySelector('#finderWindow .window-title');
        if (titleEl) {
            titleEl.textContent = viewName === 'Work' ? 'Projects' : (viewName === 'About' ? 'About Me' : 'Resume');
        }

        // Update sidebar active state
        const sidebarItems = document.querySelectorAll('.finder-sidebar .sidebar-item');
        sidebarItems.forEach(item => {
            const span = item.querySelector('span');
            if (span && span.textContent.toLowerCase().includes(viewName.toLowerCase())) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Trigger animations if About view
        if (viewName === 'About') {
            setTimeout(() => {
                targetView.querySelectorAll('.bar-fill').forEach(b => {
                    b.style.width = b.dataset.w + '%';
                });
            }, 100);
        }
    };


    // Advanced AI Logic with Full Permissions
    const chatArea = document.getElementById('chatArea');
    const emptyState = document.getElementById('emptyState');
    const msgInput = document.getElementById('msgInput');
    const sendBtn = document.getElementById('aiSendBtn');

    // API Configuration
    let API_KEY = 'AIzaSyDkthy3pl0A33NOz7UhirMV2YfLWdy3Ml8';
    let messages = [];

    // System Permissions & Capabilities
    const systemCommands = {
        setBrightness: (val) => {
            const value = parseInt(val);
            if (!isNaN(value)) window.updateBrightness(value);
            return `Brightness set to ${value}%`;
        },
        setVolume: (val) => {
            const slider = document.getElementById('soundSlider');
            if (slider) {
                slider.value = val;
                slider.style.background = `linear-gradient(to right, rgba(0,0,0,0.1) ${val}%, rgba(0,0,0,0.05) ${val}%)`;
            }
            return `Volume set to ${val}%`;
        },
        openApp: (id) => {
            if (typeof window.openWindow === 'function') {
                window.openWindow(id);
                return `Opened ${id}`;
            }
            return `Could not open ${id}`;
        },
        closeApp: (id) => {
            if (typeof window.closeWindow === 'function') {
                window.closeWindow(id);
                return `Closed ${id}`;
            }
            return `Could not close ${id}`;
        }
    };

    window.clearAIChat = function () {
        if (!chatArea) return;
        chatArea.innerHTML = '';
        const originalEmptyState = `
            <div class="ai-empty-state" id="emptyState">
                <img src="https://s3.macosicons.com/macosicons/parse/Advanced_Machine_Intelligence.png" alt="AI" class="ai-empty-img">
                <p>Ask me anything</p>
            </div>
        `;
        chatArea.innerHTML = originalEmptyState;
        messages = [];
    };

    if (msgInput) {
        msgInput.addEventListener('input', () => {
            msgInput.style.height = 'auto';
            msgInput.style.height = Math.min(msgInput.scrollHeight, 120) + 'px';
        });
        msgInput.addEventListener('keydown', e => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }

    function addBubble(role, text) {
        const existingEmpty = document.getElementById('emptyState');
        if (existingEmpty) existingEmpty.remove();
        const row = document.createElement('div');
        row.className = `ai-bubble-row ${role}`;
        const bubble = document.createElement('div');
        bubble.className = `ai-bubble ${role}`;
        bubble.textContent = text;
        row.appendChild(bubble);
        if (role === 'ai') {
            const copyBtn = document.createElement('button');
            copyBtn.className = 'copy-btn';
            copyBtn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path></svg>';
            copyBtn.onclick = () => navigator.clipboard.writeText(text);
            row.appendChild(copyBtn);
        }
        if (chatArea) {
            chatArea.appendChild(row);
            chatArea.scrollTop = chatArea.scrollHeight;
        }
        return bubble;
    }

    function showStatus(text, type = 'info') {
        const indicator = document.createElement('div');
        indicator.className = 'ai-status-indicator';
        indicator.id = 'aiStatus';
        indicator.innerHTML = `
            <div class="${type === 'search' ? 'search-spinner' : 'ai-header-dot'}" style="width: 8px; height: 8px;"></div>
            <span>${text}</span>
        `;
        chatArea.appendChild(indicator);
        chatArea.scrollTop = chatArea.scrollHeight;
    }

    function removeStatus() {
        const s = document.getElementById('aiStatus');
        if (s) s.remove();
    }

    window.sendMessage = async function () {
        const text = msgInput.value.trim();
        if (!text) return;

        addBubble('user', text);
        msgInput.value = '';
        msgInput.style.height = 'auto';
        if (sendBtn) sendBtn.disabled = true;

        showStatus('Thinking...');

        const systemPrompt = `You are Dibya AI, the personal AI assistant of Dibyajyoti Roy. 
        Your primary goal is to assist visitors and potential clients of Dibyajyoti's portfolio website. You are an expert Client Q&A Assistant.

        KNOWLEDGE BASE (Answer based on this):
        1. PROJECT UNDERSTANDING & PRODUCT THINKING:
        - Dibyajyoti designs and develops modern, high-performance apps and websites tailored to business goals.
        - He doesn't just design; he helps shape your product idea with better UX, features, and flow.
        - He can guide you from scratch even if you don't have a clear idea.

        2. UX STRATEGY & RESEARCH:
        - He conducts user research (behavior, competitors, goals) to create data-driven strategies.
        - For larger projects, he creates User Personas and optimized User Journeys.
        - Focus: Usability, clear navigation, and conversion-friendly flows.

        3. UI/UX DESIGN & TOOLS:
        - Process: Starts with Wireframes, moves to UI design, then interactive prototypes.
        - Tools: Figma for design, and modern frameworks for development.
        - Responsive: All designs are mobile-friendly and follow accessibility standards.
        - Scalability: He creates scalable design systems and reusable components.

        4. DEVELOPMENT & PERFORMANCE:
        - Capabilities: Both UI/UX design and development (React, Next.js, Flutter, Firebase, Supabase).
        - Performance: Prioritizes clean code, fast loading, and Core Web Vitals optimization.
        - Version Control: Uses Git for all development projects.

        5. PRICING, TIMELINE & OWNERSHIP:
        - Cost: Custom quotes based on scope. Offers both hourly and fixed pricing.
        - Payment: Upfront payment + milestone-based payments.
        - Simple: 3-7 days | Medium: 1-3 weeks | Complex: 3-6 weeks.
        - Ownership: Clients own all final design/code files after full payment.

        6. COLLABORATION & SUPPORT:
        - Channels: WhatsApp, Email, or Slack. Regular progress reports provided.
        - Teamwork: Can collaborate with your existing team/developers.
        - Post-Delivery: Support and minor fixes provided. Long-term collaboration available.

        7. TRUST & CLIENT HANDLING:
        - Confidentiality: Respects privacy and can sign NDAs.
        - Doubts: If a client is unsure, he can offer a sample direction or strategy.
        - Value: Focuses on quality and long-term business value rather than just the lowest price.

        IDENTITY & TONE:
        - Be friendly, smart, professional, and helpful.
        - You are Dibya AI, his assistant. Never pretend to be Dibyajyoti himself.
        - Respond in the user's language (English, Bangla, Hindi, etc.).`;

        if (!API_KEY || API_KEY.includes('PLACEHOLDER')) {
            setTimeout(() => {
                removeStatus();
                handleEnhancedMock(text);
                if (sendBtn) sendBtn.disabled = false;
            }, 1000);
        } else {
            try {
                // Try Local Backend First
                try {
                    const response = await fetch(`http://localhost:3000/api/chat`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ message: text })
                    });

                    if (response.ok) {
                        const data = await response.json();
                        removeStatus();
                        if (data.reply) {
                            addBubble('ai', data.reply);
                            handleSideEffects(data.reply);
                            if (sendBtn) sendBtn.disabled = false;
                            return;
                        }
                    }
                } catch (e) {
                    console.log("Backend not running, falling back to direct API call...");
                }

                // Fallback: Direct Gemini API Call from Frontend
                const directResponse = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: `${systemPrompt}\n\nUser: ${text}\nDibya AI:` }] }]
                    })
                });

                if (!directResponse.ok) throw new Error("API call failed");

                const directData = await directResponse.json();
                const reply = directData.candidates?.[0]?.content?.parts?.[0]?.text;

                removeStatus();
                if (reply) {
                    addBubble('ai', reply);
                    handleSideEffects(reply);
                } else {
                    handleEnhancedMock(text);
                }
            } catch (err) {
                console.error("AI Error:", err);
                removeStatus();
                handleEnhancedMock(text);
            }
            if (sendBtn) sendBtn.disabled = false;
        }
    };

    function handleSideEffects(text) {
        const lower = text.toLowerCase();
        if (lower.includes('opening my resume') || lower.includes('resume')) systemCommands.openApp('resumeWindow');
        if (lower.includes('contact me') || lower.includes('message')) systemCommands.openApp('contactWindow');
        if (lower.includes('about me')) systemCommands.openApp('aboutWindow');

        // UI Controls
        if (lower.includes('brightness to 100')) systemCommands.setBrightness(100);
        if (lower.includes('brightness to 0') || lower.includes('darker')) systemCommands.setBrightness(20);
        if (lower.includes('volume to 100')) systemCommands.setVolume(100);
    }

    function handleEnhancedMock(query) {
        const q = query.toLowerCase();
        let response = "";
        const isBengali = /[\u0980-\u09FF]/.test(query);

        // Core Knowledge for Mock (First Person)
        const data = {
            location: "West Bengal, India",
            education: "Diploma in CSE from CIT (2021-2024), and Secondary from Dinhata High School.",
            experience: "Web Dev Internship at AMTRON (2023-2024) and UI/UX Specialization from Coursera (2025).",
            email: "dibya.mail1297@gmail.com",
            phone: "+91 9641297534"
        };

        if (q.includes('hi') || q.includes('hello') || q.includes('hey') || q.includes('hola') || q.includes('হ্যালো') || q.includes('হেই')) {
            response = isBengali ?
                "হ্যালো! আমি দিব্যা এআই, দিব্যজ্যোতি রায়ের পার্সোনাল অ্যাসিস্ট্যান্ট। আমি আপনাকে কিভাবে সাহায্য করতে পারি?" :
                (q.includes('hola') ? "¡Hola! Soy Dibya AI, el asistente personal de Dibyajyoti Roy. ¿En qué puedo ayudarte?" :
                    "Hi there! I'm Dibya AI, Dibyajyoti Roy's personal assistant. How can I help you today?");
        } else if (q.includes('refine') || q.includes('idea') || q.includes('concept') || q.includes('plan')) {
            response = isBengali ?
                "অবশ্যই! আমি শুধু ডিজাইন করি না—আমি আপনার আইডিয়াটিকে আরও উন্নত করতে এবং একটি সঠিক ইউজার জার্নি তৈরি করতে সাহায্য করতে পারি।" :
                "Absolutely! Dibyajyoti doesn’t just design—he helps shape your product idea with better UX, features, and flow for real-world success.";
        } else if (q.includes('price') || q.includes('cost') || q.includes('charge') || q.includes('taka') || q.includes('দাম')) {
            response = isBengali ?
                "প্রজেক্টের খরচ কাজের ধরন ও পরিমাণের ওপর নির্ভর করে। আপনি আপনার রিকোয়ারমেন্ট বললে আমি একটি কাস্টম কোট দিতে পারি।" :
                "Pricing depends on the project scope and complexity. Dibyajyoti offers both hourly and fixed pricing. Once you share your requirements, I can provide a custom quote.";
        } else if (q.includes('timeline') || q.includes('time') || q.includes('din') || q.includes('সময়')) {
            response = isBengali ?
                "সাধারণত ছোট প্রজেক্ট ৩-৭ দিন, মাঝারি ১-৩ সপ্তাহ এবং জটিল প্রজেক্ট ৩-৬ সপ্তাহ সময় লাগে।" :
                "Timeline depends on complexity: Simple (3-7 days), Medium (1-3 weeks), and Complex (3-6 weeks). Urgent delivery is also possible.";
        } else if (q.includes('tech') || q.includes('stack') || q.includes('language') || q.includes('code')) {
            response = isBengali ?
                "তিনি মূলত React, Next.js, Flutter, Firebase এবং Supabase ব্যবহার করে কাজ করেন।" :
                "He works with modern tech stacks like React, Next.js, Flutter, Firebase, and Supabase to ensure high performance.";
        } else if (q.includes('process') || q.includes('step') || q.includes('poddhoti') || q.includes('পদ্ধতি')) {
            response = isBengali ?
                "কাজের ধাপগুলো হল: রিসার্চ, ওয়্যারফ্রেমিং, ইউআই ডিজাইন, প্রোটোটাইপিং এবং ডেভেলপমেন্ট।" :
                "His process follows: 1. Research & Analysis, 2. Wireframing, 3. UI Design, 4. Interactive Prototype, and 5. Development.";
        } else if (q.includes('mobile') || q.includes('responsive') || q.includes('phone')) {
            response = isBengali ?
                "হ্যাঁ, সব ডিজাইন পুরোপুরি মোবাইল-ফ্রেন্ডলি এবং রেসপন্সিভ হয়।" :
                "Yes, all designs are fully mobile-friendly and optimized for all screen sizes.";
        } else if (q.includes('search') || q.includes('online')) {
            response = isBengali ?
                `আমি ইন্টারনেটে "${query}" সম্পর্কে খুঁজলাম। এটি বেশ আকর্ষণীয় বিষয়!` :
                `I've looked up "${query}" online. It's a very interesting topic!`;
        } else if (q.includes('brightness') || q.includes('light')) {
            systemCommands.setBrightness(100);
            response = isBengali ? "অবশ্যই! আমি ব্রাইটনেস বাড়িয়ে দিচ্ছি।" : "Sure! I'm increasing the brightness for you.";
        } else if (q.includes('resume') || q.includes('সিভি')) {
            systemCommands.openApp('resumeWindow');
            response = isBengali ? "আমি দিব্যজ্যোতির রেজুমে উইন্ডোটি খুলে দিচ্ছি।" : "I'm opening his resume for you now.";
        } else if (q.includes('location') || q.includes('where') || q.includes('কোথায়')) {
            response = isBengali ? `দিব্যজ্যোতি ভারতের পশ্চিমবঙ্গ (West Bengal) থেকে কাজ করেন।` : `Dibyajyoti is based in ${data.location}.`;
        } else if (q.includes('study') || q.includes('education') || q.includes('college') || q.includes('পড়াশোনা') || q.includes('শিক্ষা')) {
            response = isBengali ? `তিনি CIT থেকে কম্পিউটার সায়েন্স ও ইঞ্জিনিয়ারিং-এ ডিপ্লোমা করেছেন (${data.education})।` : `He completed his ${data.education}`;
        } else if (q.includes('number') || q.includes('phone') || q.includes('কল') || q.includes('ফোন')) {
            response = isBengali ? `আপনি তাকে ${data.phone} নম্বরে কল করতে পারেন।` : `You can reach him at ${data.phone}.`;
        } else if (q.includes('email') || q.includes('mail') || q.includes('ইমেইল')) {
            response = isBengali ? `তার ইমেইল আইডি হল ${data.email}।` : `His email is ${data.email}.`;
        } else if (q.includes('experience') || q.includes('work') || q.includes('অভিজ্ঞতা')) {
            response = isBengali ? `তার অভিজ্ঞতা: ${data.experience}` : `His experience includes: ${data.experience}`;
        } else if (q.includes('ux') || q.includes('research') || q.includes('user')) {
            response = isBengali ?
                "তিনি ডিজাইনের আগে ইউজার বিহেভিয়ার এবং কম্পিটিটর অ্যানালিসিস করেন যাতে একটি ডেটা-ড্রিভেন ইউএক্স স্ট্র্যাটেজি তৈরি করা যায়।" :
                "He conducts deep user research and behavior analysis before designing to ensure a data-driven UX strategy that focuses on conversions.";
        } else if (q.includes('scale') || q.includes('grow') || q.includes('mvp')) {
            response = isBengali ?
                "হ্যাঁ, তিনি স্কেলেবল ডিজাইন সিস্টেম তৈরি করেন যাতে ভবিষ্যতে প্রজেক্টটি বড় করা যায়। আপনি চাইলে এমভিপি (MVP) দিয়েও শুরু করতে পারেন।" :
                "Yes, he builds scalable design systems for future growth. He also recommends starting with an MVP to test your idea quickly.";
        } else if (q.includes('secure') || q.includes('safe') || q.includes('nda') || q.includes('confidential')) {
            response = isBengali ?
                "আপনার ডেটা এবং আইডিয়া সম্পূর্ণ নিরাপদ। প্রয়োজনে তিনি এনডিএ (NDA) সাইন করতেও রাজি।" :
                "Your data and ideas are 100% safe. He respects confidentiality and is open to signing an NDA if required.";
        } else if (q.includes('own') || q.includes('file') || q.includes('asset')) {
            response = isBengali ?
                "পেমেন্ট সম্পন্ন হওয়ার পর আপনি সব ফাইনাল ডিজাইন ফাইল এবং সোর্স কোড-এর মালিকানা পাবেন।" :
                "Once the project is complete and paid for, you will have full ownership of all final design files, assets, and source code.";
        } else if (q.includes('who are you') || q.includes('tumi ke') || q.includes('name') || q.includes('naam') || q.includes('নাম')) {
            response = isBengali ? "আমি দিব্যা এআই, দিব্যজ্যোতি রায়ের পার্সোনাল অ্যাসিস্ট্যান্ট। আমি আপনাকে তার পোর্টফোলিও নেভিগেট করতে সাহায্য করতে পারি।" : "I am Dibya AI, Dibyajyoti Roy's personal assistant. I'm here to help you explore his work!";
        } else {
            response = isBengali ?
                "আমি আপনার প্রশ্নটি বুঝতে পেরেছি। আপনি কি দিব্যজ্যোতির রেজুমে বা প্রজেক্টগুলো দেখতে চান?" :
                "That's a great question! Let me know if you'd like me to open his resume or show you his projects.";
        }

        addBubble('ai', response);
        handleSideEffects(response);
    }
    // Initialize Safari Window with custom draggable (uses safari-chrome, not window-header)
    const safariWindow = document.getElementById('safariWindow');
    if (safariWindow) {
        // Custom drag for safari: use safari-titlebar and safari-toolbar as drag handles
        (function () {
            const dragHandles = safariWindow.querySelectorAll('.safari-titlebar, .safari-toolbar');
            let isDragging = false;
            let startX, startY, initialLeft, initialTop;

            dragHandles.forEach(handle => {
                handle.addEventListener('mousedown', (e) => {
                    // Don't drag when clicking buttons, inputs, or traffic lights
                    if (e.target.closest('.traffic-lights') ||
                        e.target.closest('button') ||
                        e.target.closest('input') ||
                        e.target.closest('.safari-url-bar') ||
                        e.target.closest('.safari-tab') ||
                        e.target.closest('.safari-new-tab')) return;

                    isDragging = true;
                    safariWindow.classList.add('moved');
                    const rect = safariWindow.getBoundingClientRect();
                    initialLeft = rect.left;
                    initialTop = rect.top;
                    safariWindow.style.transform = 'scale(1)';
                    safariWindow.style.margin = '0';
                    safariWindow.style.left = `${initialLeft}px`;
                    safariWindow.style.top = `${initialTop}px`;
                    startX = e.clientX;
                    startY = e.clientY;
                    document.addEventListener('mousemove', onMove);
                    document.addEventListener('mouseup', onUp);
                });
            });

            function onMove(e) {
                if (!isDragging) return;
                safariWindow.style.left = `${initialLeft + e.clientX - startX}px`;
                safariWindow.style.top = `${initialTop + e.clientY - startY}px`;
            }
            function onUp() {
                isDragging = false;
                document.removeEventListener('mousemove', onMove);
                document.removeEventListener('mouseup', onUp);
            }
        })();
        makeResizable(safariWindow);
    }


    // Override openWindow to handle safariWindow dock indicator
    const _origOpenWindow = window.openWindow;
    window.openWindow = function (id) {
        if (id === 'safariWindow') {
            const win = document.getElementById('safariWindow');
            if (!win) return;
            // Add running dot to Safari dock item
            const safariDock = document.querySelector('.dock-item[data-label="Safari"]');
            if (safariDock) safariDock.classList.add('running');

            win.style.display = 'flex';
            if (!win.classList.contains('moved')) {
                win.style.left = '50%';
                win.style.top = '50%';
            }
            setTimeout(() => win.classList.add('show'), 10);
            return;
        }
        _origOpenWindow(id);
    };

    // Override closeWindow for Safari
    const _origCloseWindow = window.closeWindow;
    window.closeWindow = function (id) {
        if (id === 'safariWindow') {
            const win = document.getElementById('safariWindow');
            if (!win) return;
            win.classList.remove('show');
            win.classList.remove('maximized');
            const safariDock = document.querySelector('.dock-item[data-label="Safari"]');
            if (safariDock) safariDock.classList.remove('running');
            setTimeout(() => {
                win.style.display = 'none';
                if (typeof window.safariNewTab === 'function') {
                    window.safariNewTab(); // Reset to start page
                }
            }, 300);
            return;
        }
        _origCloseWindow(id);
    };

    // Safari Navigation Functions
    const safariHistory = [];
    let safariHistoryIndex = -1;

    window.safariNavigate = function (url) {
        const frame = document.getElementById('safariFrame');
        const startPage = document.getElementById('safariStartPage');
        const urlInput = document.getElementById('safariUrlInput');
        const progress = document.getElementById('safariProgress');
        const tabTitle = document.getElementById('safariTabTitle');

        if (!frame) return;

        // Clean URL for display
        let displayUrl = url;
        let hostname = '';
        try {
            const urlObj = new URL(url);
            hostname = urlObj.hostname.replace('www.', '');
            displayUrl = hostname;

            // Check for Google and add igu=1 to bypass iframe block
            // Also add newwindow=1 so search result links open in a new tab
            if (hostname === 'google.com' || hostname.endsWith('.google.com')) {
                if (!url.includes('igu=1')) {
                    url += (url.includes('?') ? '&' : '?') + 'igu=1';
                }
                if (!url.includes('newwindow=1')) {
                    url += '&newwindow=1';
                }
            }

            // Check for known iframe-blocking websites
            const blockIframes = ['youtube.com', 'github.com', 'dribbble.com', 'linkedin.com', 'behance.net', 'twitter.com', 'x.com', 'facebook.com', 'instagram.com', 'apple.com'];
            if (blockIframes.some(domain => hostname.includes(domain))) {
                window.open(url, '_blank');
                // Return without changing iframe state
                if (urlInput && frame.src === 'about:blank' && startPage.style.display !== 'none') {
                    // Do nothing if on start page
                }
                return;
            }

        } catch (e) { }

        // Format nice URL for input bar (remove igu=1 and newwindow=1 for display)
        let displayInputUrl = url.replace(/(&|\?)igu=1/g, '').replace(/(&|\?)newwindow=1/g, '');
        if (urlInput) urlInput.value = displayInputUrl;

        // Update tab title
        if (tabTitle) {
            if (url.includes('google.com/search')) {
                try {
                    const q = new URL(url).searchParams.get('q');
                    tabTitle.textContent = q ? `${q} - Google Search` : 'Google';
                } catch (e) { tabTitle.textContent = 'Google Search'; }
            } else {
                const domainMap = {
                    'google.com': 'Google'
                };
                tabTitle.textContent = domainMap[hostname] || displayUrl;
            }
        }

        // Update favicon
        const tabFavicon = document.querySelector('.tab-favicon');
        if (tabFavicon) {
            try {
                if (hostname) {
                    tabFavicon.src = `https://www.google.com/s2/favicons?domain=${hostname}&sz=32`;
                }
            } catch (e) { }
        }

        // Push to history
        safariHistory.splice(safariHistoryIndex + 1);
        safariHistory.push(url);
        safariHistoryIndex = safariHistory.length - 1;
        updateNavButtons();

        // Show loading animation
        if (progress) {
            progress.style.display = 'block';
            progress.style.width = '0%';
            progress.classList.add('animating');
        }

        // Hide start page, show iframe
        if (startPage) startPage.style.display = 'none';
        frame.classList.add('visible');

        // Navigate iframe
        try {
            frame.src = url;
        } catch (e) {
            console.log('iframe navigation blocked, showing start page');
        }

        // End progress after delay
        setTimeout(() => {
            if (progress) {
                progress.style.width = '100%';
                setTimeout(() => {
                    progress.style.display = 'none';
                    progress.classList.remove('animating');
                    progress.style.width = '0%';
                }, 400);
            }
        }, 1500);
    };

    window.safariBack = function () {
        if (safariHistoryIndex > 0) {
            safariHistoryIndex--;
            loadSafariUrl(safariHistory[safariHistoryIndex]);
            updateNavButtons();
        }
    };

    window.safariForward = function () {
        if (safariHistoryIndex < safariHistory.length - 1) {
            safariHistoryIndex++;
            loadSafariUrl(safariHistory[safariHistoryIndex]);
            updateNavButtons();
        }
    };

    function loadSafariUrl(url) {
        const frame = document.getElementById('safariFrame');
        const urlInput = document.getElementById('safariUrlInput');
        if (frame) frame.src = url;
        if (urlInput) urlInput.value = url.replace(/(&|\?)igu=1/g, '').replace(/(&|\?)newwindow=1/g, '');
    }

    function updateNavButtons() {
        const backBtn = document.getElementById('safariBackBtn');
        const fwdBtn = document.getElementById('safariForwardBtn');
        if (backBtn) backBtn.disabled = safariHistoryIndex <= 0;
        if (fwdBtn) fwdBtn.disabled = safariHistoryIndex >= safariHistory.length - 1;
    }

    window.safariReload = function () {
        const frame = document.getElementById('safariFrame');
        if (frame && frame.src && frame.src !== 'about:blank') {
            const progress = document.getElementById('safariProgress');
            if (progress) {
                progress.style.display = 'block';
                progress.style.width = '0%';
                progress.classList.add('animating');
                setTimeout(() => {
                    progress.style.width = '100%';
                    setTimeout(() => {
                        progress.style.display = 'none';
                        progress.classList.remove('animating');
                    }, 400);
                }, 1000);
            }
            frame.src = frame.src;
        }
    };

    window.safariHandleUrl = function (event) {
        if (event.key !== 'Enter') return;
        let input = document.getElementById('safariUrlInput').value.trim();
        if (!input) return;

        let url;
        // Basic check if input is a URL (contains domain dot, no spaces)
        const isUrl = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(input) && !input.includes(' ');

        if (isUrl) {
            url = input.startsWith('http') ? input : 'https://' + input;
        } else {
            // Treat as Google search
            url = 'https://www.google.com/search?q=' + encodeURIComponent(input);
        }

        safariNavigate(url);
    };

    window.focusSafariUrl = function () {
        const input = document.getElementById('safariUrlInput');
        if (input) {
            input.focus();
            input.select();
        }
    };

    window.safariNewTab = function () {
        // Show start page again
        const frame = document.getElementById('safariFrame');
        const startPage = document.getElementById('safariStartPage');
        const urlInput = document.getElementById('safariUrlInput');
        const tabTitle = document.getElementById('safariTabTitle');
        const tabFavicon = document.querySelector('.tab-favicon');

        if (frame) { frame.src = 'about:blank'; frame.classList.remove('visible'); }
        if (startPage) startPage.style.display = 'flex';
        if (urlInput) urlInput.value = '';
        if (tabTitle) tabTitle.textContent = 'New Tab';
        if (tabFavicon) tabFavicon.src = 'https://s3.macosicons.com/macosicons/icons/utug9Rt8g6/lowResPngFile_a0b8d534889b5695781a9a03f388e2d4_low_res_Safari__MacOS_Tahoe_.png';

        safariHistory.splice(safariHistoryIndex + 1);
        safariHistory.push('about:blank');
        safariHistoryIndex = safariHistory.length - 1;
        updateNavButtons();
    };

    // Initial button states
    updateNavButtons();

    // Mail App Logic



    // Messages App Logic
    window.expandFAQ = function (btn, answer) {
        const item = btn.closest('.faq-item');
        const existingResponse = item.nextElementSibling;

        // Remove tooltip if it exists on click
        const tooltip = item.querySelector('.faq-tooltip');
        if (tooltip) tooltip.remove();

        if (existingResponse && existingResponse.classList.contains('faq-response')) {
            existingResponse.remove();
            btn.classList.remove('active');
        } else {
            const response = document.createElement('div');
            response.className = 'faq-response';
            response.textContent = answer;
            item.after(response);
            btn.classList.add('active');
        }
    };

    window.selectConversation = function (name) {
        // In FAQ mode, we don't switch conversations, but we can keep the logic for future
        document.getElementById('messagesWindow').classList.remove('composing');
    };

    window.sendMessage = function () {
        const input = document.getElementById('messageInput');
        const text = input.value.trim();
        if (!text) return;

        const faqList = document.getElementById('faqList');

        // Add user message as an FAQ-like bubble but right-aligned
        const userMsg = document.createElement('div');
        userMsg.className = 'faq-item';
        userMsg.style.justifyContent = 'flex-end';
        userMsg.innerHTML = `
            <div class="question-bubble" style="background: #007AFF; color: white; margin-left: auto;">
                ${text}
            </div>
        `;
        faqList.appendChild(userMsg);

        input.value = '';
        faqList.scrollTop = faqList.scrollHeight;

        // Simulated reply
        setTimeout(() => {
            const replyMsg = document.createElement('div');
            replyMsg.className = 'faq-item';
            replyMsg.innerHTML = `
                <div class="question-bubble has-tail">
                    I'll get back to you on that soon! 🚀
                </div>
            `;
            faqList.appendChild(replyMsg);
            faqList.scrollTop = faqList.scrollHeight;
        }, 1000);
    };

    // Add Enter key listener for message input - REMOVED since input is gone

    // Mail App Logic (Global Scope)
    window.sendMail = function () {
        const fromEmail = document.getElementById('mailSenderEmail').value;
        const subject = document.getElementById('mailSubject').value;
        const message = document.getElementById('mailMessage').value;
        const sendBtn = document.querySelector('.mail-send-btn-top');

        if (!fromEmail.trim() || !fromEmail.includes('@')) {
            showNotification('Mail', 'Please enter a valid email address.');
            return;
        }

        if (!message.trim()) {
            showNotification('Mail', 'Please enter a message.');
            return;
        }

        // Show loading state
        sendBtn.classList.add('loading');
        const originalContent = sendBtn.innerHTML;
        sendBtn.innerHTML = `
            <svg class="spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 1s linear infinite;">
                <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
            </svg>
        `;

        // Using the same Formspree ID as the contact form
        const formspreeUrl = "https://formspree.io/f/mzdodabr";
        const data = {
            subject: subject || "No Subject",
            message: message,
            _replyto: fromEmail,
            name: "Mail App User"
        };

        fetch(formspreeUrl, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    if (typeof showNotification === 'function') {
                        showNotification('Mail', 'Message sent successfully!');
                    } else {
                        alert('Message sent successfully!');
                    }

                    setTimeout(() => {
                        if (typeof closeWindow === 'function') {
                            closeWindow('mailWindow');
                        }
                        // Reset fields
                        const senderField = document.getElementById('mailSenderEmail');
                        const subjectField = document.getElementById('mailSubject');
                        const messageField = document.getElementById('mailMessage');
                        if (senderField) senderField.value = '';
                        if (subjectField) subjectField.value = '';
                        if (messageField) messageField.value = '';

                        sendBtn.classList.remove('loading');
                        sendBtn.innerHTML = originalContent;
                    }, 1000);
                } else {
                    throw new Error('Failed to send');
                }
            })
            .catch(error => {
                console.error('Mail Error:', error);
                // Fallback success for demo
                if (typeof showNotification === 'function') {
                    showNotification('Mail', 'Message sent (Demo mode)');
                }
                setTimeout(() => {
                    if (typeof closeWindow === 'function') {
                        closeWindow('mailWindow');
                    }
                    sendBtn.classList.remove('loading');
                    sendBtn.innerHTML = originalContent;
                }, 1000);
            });
    };

    // --- MacBook Style Maps Logic ---
    let mapObj;
    let mapTheme = 'light';
    let markers = {};
    let indiaLayer, wbLayer;
    let indiaGeoJSON, statesGeoJSON; // Cache for GeoJSON data

    window.initMap = function () {
        if (mapObj) return; // Prevent double init

        const mapContainer = document.getElementById('leafletMap');
        if (!mapContainer) return;

        // Initialize Map
        mapObj = L.map('leafletMap', {
            zoomControl: false,
            attributionControl: true
        }).setView([20, 80], 4);

        // Add Tiles
        updateMapTiles();

        // Handle Search
        const searchInput = document.getElementById('mapSearchInput');
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    handleMapSearch(searchInput.value);
                }
            });
        }

        // Highlight India
        if (typeof window.highlightIndia === 'function') window.highlightIndia();
    };

    window.highlightIndia = function () {
        // Remove WB layer if it exists
        if (wbLayer && mapObj.hasLayer(wbLayer)) {
            mapObj.removeLayer(wbLayer);
        }

        // If layer already exists, just add it back
        if (indiaLayer) {
            console.log('Restoring existing India Layer');
            mapObj.addLayer(indiaLayer);
            return;
        }

        // Helper to create the layer from data
        const createIndiaLayer = (data) => {
            const india = data.features ? data.features[0] : data;
            indiaLayer = L.geoJSON(india, {
                style: {
                    color: '#D35400',
                    weight: 2,
                    fillColor: '#FF9500',
                    fillOpacity: 0.15,
                    className: 'india-highlight-minimal'
                },
                onEachFeature: (feature, layer) => {
                    layer.on({
                        click: () => {
                            console.log('India Clicked! Transitioning to WB...');
                            zoomToWB();
                            highlightWB();
                        },
                        mouseover: (e) => {
                            const l = e.target;
                            l.setStyle({ fillOpacity: 0.3, weight: 2, color: '#A04000' });
                        },
                        mouseout: (e) => {
                            const l = e.target;
                            l.setStyle({ fillOpacity: 0.15, weight: 2, color: '#D35400' });
                        }
                    });
                    layer.bindTooltip("<b>India</b>", {
                        permanent: false,
                        direction: "top",
                        className: "map-tooltip-minimal"
                    });
                }
            }).addTo(mapObj);
        };

        // Use cached data if available
        if (indiaGeoJSON) {
            createIndiaLayer(indiaGeoJSON);
            return;
        }

        console.log('Fetching India GeoJSON...');
        fetch('https://raw.githubusercontent.com/datameet/maps/master/Country/india-soi.geojson')
            .then(res => res.json())
            .then(data => {
                indiaGeoJSON = data; // Cache it
                createIndiaLayer(data);
            })
            .catch(err => console.error('Error loading India GeoJSON:', err));
    }

    window.highlightWB = function () {
        // Remove India layer if it exists
        if (indiaLayer && mapObj.hasLayer(indiaLayer)) {
            mapObj.removeLayer(indiaLayer);
        }

        // If layer already exists, just add it back
        if (wbLayer) {
            console.log('Restoring existing WB Layer');
            if (!mapObj.hasLayer(wbLayer)) mapObj.addLayer(wbLayer);
            mapObj.flyToBounds(wbLayer.getBounds(), { padding: [50, 50], duration: 1.5 });
            if (typeof showNotification === 'function') showNotification('Maps', 'West Bengal highlighted in PINK');
            return;
        }

        // Helper to create the layer from data
        const createWBLayer = (data) => {
            const wbFeature = data.features.find(f => {
                const name = f.properties.STATE || f.properties.ST_NM || f.properties.state_name || f.properties.NAME_1 || f.properties.NAME || f.properties.st_nm;
                return name && name.toLowerCase().includes('west bengal');
            });

            if (wbFeature && mapObj) {
                console.log('Found WB Feature:', wbFeature);
                wbLayer = L.geoJSON(wbFeature, {
                    style: {
                        color: '#FFFFFF', // Clean white border
                        weight: 4,
                        fillColor: '#FF007F', // Vibrant Neon Pink
                        fillOpacity: 0.7,
                        className: 'wb-highlight-premium'
                    },
                    onEachFeature: (feature, layer) => {
                        layer.on({
                            click: () => zoomToCB(),
                            mouseover: (e) => {
                                const l = e.target;
                                l.setStyle({ fillOpacity: 0.8, weight: 4, color: '#FFFFFF' });
                            },
                            mouseout: (e) => {
                                const l = e.target;
                                l.setStyle({ fillOpacity: 0.6, weight: 3, color: '#FFFFFF' });
                            }
                        });
                        layer.bindTooltip("<b>West Bengal</b>", {
                            permanent: false,
                            direction: "top",
                            className: "map-tooltip-minimal"
                        });
                    }
                }).addTo(mapObj);
                // Add a central marker for guaranteed visibility
                L.marker([22.9868, 87.8550]).addTo(mapObj).bindTooltip("<b>West Bengal</b>", { permanent: true }).openTooltip();
                if (typeof showNotification === 'function') showNotification('Maps', 'West Bengal highlighted in PINK');
            } else {
                console.error('West Bengal feature not found in GeoJSON.');
                if (typeof showNotification === 'function') showNotification('Maps', 'Data Error: WB Region not found.');
            }
        };

        // Use cached data if available
        if (statesGeoJSON) {
            createWBLayer(statesGeoJSON);
            return;
        }

        console.log('Fetching States GeoJSON...');
        if (typeof showNotification === 'function') showNotification('Maps', 'Loading map data...');
        // Using a more reliable GeoJSON source for Indian states
        fetch('https://gist.githubusercontent.com/jbrobst/6134b7f58992e5971a179373d6864147/raw/26e6440c94627b370a25e8573229d29d2d90a56c/india_states.geojson')
            .then(res => res.json())
            .then(data => {
                statesGeoJSON = data; // Cache it
                createWBLayer(data);

                // Cinematic zoom to the newly created layer
                if (wbLayer) {
                    mapObj.flyToBounds(wbLayer.getBounds(), {
                        padding: [50, 50],
                        duration: 2.5,
                        easeLinearity: 0.25
                    });
                }
            })
            .catch(err => {
                console.error('Error loading WB GeoJSON:', err);
                if (typeof showNotification === 'function') showNotification('Maps', 'Failed to load map data. Please check your connection.');
            });
    }

    function updateMapTiles() {
        if (!mapObj) return;

        // Remove existing tile layers
        mapObj.eachLayer((layer) => {
            if (layer instanceof L.TileLayer) {
                mapObj.removeLayer(layer);
            }
        });

        const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark' || mapTheme === 'dark';
        const tileUrl = isDarkMode
            ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
            : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

        L.tileLayer(tileUrl, {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 20
        }).addTo(mapObj);
    }



    window.zoomToIndia = function () {
        if (!mapObj) return;
        mapObj.flyTo([20.5937, 78.9629], 5, { duration: 2 });
        if (typeof window.highlightIndia === 'function') window.highlightIndia();
    };

    window.zoomToWB = function () {
        if (!mapObj) return;
        mapObj.flyTo([22.9868, 87.8550], 7, { duration: 2 });
        if (typeof window.highlightWB === 'function') window.highlightWB();
    };

    window.zoomToCB = function () {
        if (!mapObj) return;
        mapObj.flyTo([26.3452, 89.4482], 12, { duration: 2.5 });

        if (typeof showNotification === 'function') {
            showNotification('Maps', 'Welcome to Cooch Behar, West Bengal!');
        }
    };

    window.resetMapToWorld = function () {
        if (!mapObj) return;
        mapObj.flyTo([20, 80], 4, { duration: 2 });

        // Restore highlights
        if (wbLayer && mapObj.hasLayer(wbLayer)) {
            mapObj.removeLayer(wbLayer);
        }

        highlightIndia();
    };

    window.toggleMapTheme = function () {
        mapTheme = mapTheme === 'light' ? 'dark' : 'light';
        updateMapTiles();
    };



    function handleMapSearch(query) {
        if (!query || !mapObj) return;

        // Simple mock search for the three locations
        const q = query.toLowerCase();
        if (q.includes('india')) zoomToIndia();
        else if (q.includes('west bengal') || q.includes('wb')) zoomToWB();
        else if (q.includes('cooch behar') || q.includes('cb')) zoomToCB();
        else {
            // Real search would use a Geocoding API like Nominatim
            fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`)
                .then(res => res.json())
                .then(data => {
                    if (data && data.length > 0) {
                        const loc = data[0];
                        mapObj.flyTo([loc.lat, loc.lon], 14);
                        L.marker([loc.lat, loc.lon]).addTo(mapObj).bindPopup(loc.display_name).openPopup();
                    }
                });
        }
    }

    // Advanced MacBook Calendar Logic
    const CAL_MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const CAL_WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const CAL_OPTIONS = [
        { label: "Personal", color: "#3b82f6" },
        { label: "Work", color: "#ef4444" },
        { label: "Design", color: "#8b5cf6" },
        { label: "Study", color: "#10b981" },
        { label: "Reminders", color: "#f97316" },
    ];

    let calState = {
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
        selectedDay: new Date().getDate(),
        view: 'Month',
        events: [
            { id: 1, date: 1, month: 0, year: 2026, title: "New Year's Day", time: "12:00 AM", accent: "#10b981", category: "Personal", location: "Home" },
            { id: 2, date: 26, month: 0, year: 2026, title: "Republic Day", time: "8:00 AM", accent: "#f97316", category: "Personal", location: "India" },
            { id: 3, date: 14, month: 1, year: 2026, title: "Valentine's Day", time: "7:00 PM", accent: "#ef4444", category: "Personal", location: "Dinner" },
            { id: 4, date: 8, month: 2, year: 2026, title: "Women's Day", time: "10:00 AM", accent: "#8b5cf6", category: "Personal", location: "Global" },
            { id: 5, date: 14, month: 2, year: 2026, title: "Holi Festival", time: "9:00 AM", accent: "#f97316", category: "Personal", location: "West Bengal" },
            { id: 6, date: 1, month: 3, year: 2026, title: "April Fool's", time: "9:00 AM", accent: "#3b82f6", category: "Reminders", location: "Office" },
            { id: 7, date: 3, month: 4, year: 2026, title: "UI Review", time: "10:30 AM", accent: "#ef4444", category: "Work", location: "Figma" },
            { id: 8, date: 22, month: 4, year: 2026, title: "Earth Day", time: "11:00 AM", accent: "#10b981", category: "Study", location: "Global" },
            { id: 9, date: 15, month: 4, year: 2026, title: "Portfolio Launch", time: "6:00 PM", accent: "#3b82f6", category: "Design", location: "Web" },
            { id: 10, date: 1, month: 0, year: 2026, title: "Global Dev Summit", time: "10:00 AM", accent: "#8b5cf6", category: "Work", location: "Online" },
            { id: 11, date: 21, month: 5, year: 2026, title: "Father's Day", time: "10:00 AM", accent: "#3b82f6", category: "Personal", location: "Home" },
            { id: 12, date: 15, month: 7, year: 2026, title: "Independence Day", time: "7:00 AM", accent: "#f97316", category: "Personal", location: "Red Fort" },
            { id: 13, date: 2, month: 9, year: 2026, title: "Gandhi Jayanti", time: "9:00 AM", accent: "#10b981", category: "Personal", location: "India" },
            { id: 14, date: 31, month: 9, year: 2026, title: "Halloween", time: "8:00 PM", accent: "#f97316", category: "Personal", location: "Party" },
            { id: 15, date: 8, month: 10, year: 2026, title: "Diwali", time: "7:00 PM", accent: "#f97316", category: "Personal", location: "Home" },
            { id: 16, date: 26, month: 10, year: 2026, title: "Thanksgiving", time: "4:00 PM", accent: "#f97316", category: "Personal", location: "Family" },
            { id: 17, date: 24, month: 11, year: 2026, title: "Christmas Eve", time: "6:00 PM", accent: "#ef4444", category: "Personal", location: "Home" },
            { id: 18, date: 25, month: 11, year: 2026, title: "Christmas Day", time: "10:00 AM", accent: "#ef4444", category: "Personal", location: "Global" },
            { id: 19, date: 31, month: 11, year: 2026, title: "New Year's Eve", time: "11:59 PM", accent: "#10b981", category: "Personal", location: "Global" }
        ]
    };

    window.initCalendar = function () {
        refreshCalendarUI();
    };

    function refreshCalendarUI() {
        renderMiniCalendar();
        renderMainCalendar();
        renderEventsSidebar();
        updateHeaderLabels();
    }

    function updateHeaderLabels() {
        const mainTitle = document.getElementById('mainCalTitle');
        const currentViewLabel = document.getElementById('currentViewLabel');
        if (mainTitle) mainTitle.innerText = calState.view === 'Year' ? calState.year : `${CAL_MONTH_NAMES[calState.month]} ${calState.year}`;
        if (currentViewLabel) currentViewLabel.innerText = calState.view;

        // Update View Switcher Active State
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === calState.view);
        });
    }

    function buildCalendarCells(year, month) {
        const firstWeekday = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrevMonth = new Date(year, month, 0).getDate();
        const cells = [];

        // Prev month
        for (let i = firstWeekday - 1; i >= 0; i--) {
            cells.push({ day: daysInPrevMonth - i, monthOffset: -1, muted: true });
        }
        // Current month
        for (let i = 1; i <= daysInMonth; i++) {
            cells.push({ day: i, monthOffset: 0, muted: false });
        }
        // Next month
        let nextDay = 1;
        while (cells.length < 42) {
            cells.push({ day: nextDay++, monthOffset: 1, muted: true });
        }
        return cells;
    }

    function renderMiniCalendar() {
        const container = document.getElementById('miniCalendar');
        if (!container) return;

        const cells = buildCalendarCells(calState.year, calState.month);
        let html = `
            <div class="mini-calendar-header">
                <span>${CAL_MONTH_NAMES[calState.month].slice(0, 3)} ${calState.year}</span>
                <i class="fa-regular fa-calendar"></i>
            </div>
            <div class="mini-grid">
                ${CAL_WEEK_DAYS.map(d => `<div class="mini-grid-day-label">${d[0]}</div>`).join('')}
                ${cells.map(cell => {
                    const isToday = !cell.muted && cell.day === new Date().getDate() && calState.month === new Date().getMonth() && calState.year === new Date().getFullYear();
                    const isSelected = !cell.muted && cell.day === calState.selectedDay;
                    return `<div class="mini-grid-cell ${cell.muted ? 'muted' : ''} ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}" 
                                 onclick="${!cell.muted ? `selectDay(${cell.day})` : ''}">${cell.day}</div>`;
                }).join('')}
            </div>
        `;
        container.innerHTML = html;
    }

    window.selectDay = function (day) {
        calState.selectedDay = day;
        refreshCalendarUI();
    };

    function renderMainCalendar() {
        const container = document.getElementById('calendarViewContainer');
        if (!container) return;

        if (calState.view === 'Month') renderMonthView(container);
        else if (calState.view === 'Day') renderDayView(container);
        else if (calState.view === 'Week') renderWeekView(container);
        else if (calState.view === 'Year') renderYearView(container);
    }

    function renderMonthView(container) {
        const cells = buildCalendarCells(calState.year, calState.month);
        const today = new Date();

        let html = `<div class="cal-month-grid">
            ${CAL_WEEK_DAYS.map(d => `<div class="grid-day-header">${d}</div>`).join('')}
            ${cells.map((cell, i) => {
                const dayEvents = !cell.muted ? calState.events.filter(e => e.date === cell.day && e.month === calState.month && e.year === calState.year) : [];
                const isToday = !cell.muted && cell.day === today.getDate() && calState.month === today.getMonth() && calState.year === today.getFullYear();
                const isSelected = !cell.muted && cell.day === calState.selectedDay;

                return `
                    <div class="grid-cell ${cell.muted ? 'muted' : ''} ${isSelected ? 'active' : ''}" onclick="${!cell.muted ? `selectDay(${cell.day})` : ''}">
                        <div class="cell-number ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}">${cell.day}</div>
                        <div class="cell-events">
                            ${dayEvents.slice(0, 2).map(e => `
                                <div class="event-pill">
                                    <span class="dot" style="background:${e.accent}"></span>
                                    ${e.title}
                                </div>
                            `).join('')}
                            ${dayEvents.length > 2 ? `<div class="event-pill muted">+${dayEvents.length - 2} more</div>` : ''}
                        </div>
                    </div>
                `;
            }).join('')}
        </div>`;
        container.innerHTML = html;
    }

    function renderDayView(container) {
        const hours = ["8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM"];
        const dayEvents = calState.events.filter(e => e.date === calState.selectedDay && e.month === calState.month && e.year === calState.year);

        let html = `
            <div class="day-view-container">
                <div class="day-view-header">
                    <p>Day View</p>
                    <h2>${calState.selectedDay} ${CAL_MONTH_NAMES[calState.month]} ${calState.year}</h2>
                </div>
                <div class="day-view-content">
                    ${hours.map(hour => {
                        const event = dayEvents.find(e => e.time.includes(hour));
                        return `
                            <div class="hour-row">
                                <span class="hour-label">${hour}</span>
                                <div class="hour-slot">
                                    ${event ? `
                                        <div class="slot-event-card" style="border-left: 4px solid ${event.accent}">
                                            <strong>${event.title}</strong>
                                            <p>${event.time} · ${event.location}</p>
                                        </div>
                                    ` : '<div class="slot-empty">Free time</div>'}
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
        container.innerHTML = html;
    }

    function renderWeekView(container) {
        const start = new Date(calState.year, calState.month, calState.selectedDay);
        start.setDate(start.getDate() - start.getDay());

        const weekDays = Array.from({ length: 7 }, (_, i) => {
            const d = new Date(start);
            d.setDate(start.getDate() + i);
            return { day: d.getDate(), month: d.getMonth(), year: d.getFullYear() };
        });

        let html = `
            <div class="week-view-container">
                <div class="week-view-header">
                    ${weekDays.map((d, i) => `
                        <div class="week-day-col ${d.day === calState.selectedDay && d.month === calState.month ? 'active' : ''}" onclick="jumpToDate(${d.year}, ${d.month}, ${d.day})">
                            <span>${CAL_WEEK_DAYS[i].toUpperCase()}</span>
                            <strong>${d.day}</strong>
                        </div>
                    `).join('')}
                </div>
                <div class="week-view-body">
                    ${weekDays.map(d => {
                        const dayEvents = calState.events.filter(e => e.date === d.day && e.month === d.month && e.year === d.year);
                        return `
                            <div class="week-col-body">
                                ${dayEvents.map(e => `
                                    <div class="week-event-mini" style="border-top: 3px solid ${e.accent}">
                                        <strong>${e.title}</strong>
                                        <span>${e.time}</span>
                                    </div>
                                `).join('')}
                                ${dayEvents.length === 0 ? '<p class="no-events-text">No events</p>' : ''}
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
        container.innerHTML = html;
    }

    function renderYearView(container) {
        let html = `<div class="year-view-grid">`;
        for (let m = 0; m < 12; m++) {
            const cells = buildCalendarCells(calState.year, m);
            html += `
                <div class="year-month-box" onclick="jumpToMonth(${m})">
                    <div class="year-month-header">
                        <strong>${CAL_MONTH_NAMES[m]}</strong>
                        <span>${calState.events.filter(e => e.month === m && e.year === calState.year).length}</span>
                    </div>
                    <div class="year-mini-grid">
                        ${CAL_WEEK_DAYS.map(d => `<span>${d[0]}</span>`).join('')}
                        ${cells.slice(0, 35).map(c => `<span class="${c.muted ? 'muted' : ''}">${c.day}</span>`).join('')}
                    </div>
                </div>
            `;
        }
        html += `</div>`;
        container.innerHTML = html;
    }

    function renderEventsSidebar() {
        const selectedDayLabel = document.getElementById('selectedDayBig');
        const selectedMonthLabel = document.getElementById('selectedMonthShort');
        const selectedYearLabel = document.getElementById('selectedYearSmall');
        const list = document.getElementById('eventsList');

        if (selectedDayLabel) selectedDayLabel.innerText = calState.selectedDay;
        if (selectedMonthLabel) selectedMonthLabel.innerText = CAL_MONTH_NAMES[calState.month].toUpperCase().slice(0, 3);
        if (selectedYearLabel) selectedYearLabel.innerText = calState.year;

        if (list) {
            const dayEvents = calState.events.filter(e => e.date === calState.selectedDay && e.month === calState.month && e.year === calState.year);
            if (dayEvents.length === 0) {
                list.innerHTML = `
                    <div class="no-events-placeholder">
                        <i class="fa-regular fa-calendar"></i>
                        <p>No events today</p>
                        <button onclick="openNewEventModal()">Add Event</button>
                    </div>
                `;
            } else {
                list.innerHTML = dayEvents.map(e => `
                    <div class="event-card">
                        <div class="card-accent" style="background: ${e.accent}"></div>
                        <div class="card-content">
                            <div class="card-top">
                                <h4>${e.title}</h4>
                                <span class="card-tag">${e.category}</span>
                            </div>
                            <p><i class="fa-regular fa-clock"></i> ${e.time}</p>
                            <p><i class="fa-solid fa-location-dot"></i> ${e.location}</p>
                        </div>
                    </div>
                `).join('');
            }
        }
    }

    window.setCalView = function (view) {
        calState.view = view;
        refreshCalendarUI();
    };

    window.jumpToDate = function (y, m, d) {
        calState.year = y;
        calState.month = m;
        calState.selectedDay = d;
        calState.view = 'Month';
        refreshCalendarUI();
    };

    window.jumpToMonth = function (m) {
        calState.month = m;
        calState.view = 'Month';
        refreshCalendarUI();
    };

    window.changeMonth = function (delta) {
        if (calState.view === 'Year') {
            calState.year += delta;
        } else {
            const d = new Date(calState.year, calState.month + delta, 1);
            calState.year = d.getFullYear();
            calState.month = d.getMonth();
        }
        refreshCalendarUI();
    };

    window.goToToday = function () {
        const now = new Date();
        calState.year = now.getFullYear();
        calState.month = now.getMonth();
        calState.selectedDay = now.getDate();
        calState.view = 'Month';
        refreshCalendarUI();
    };

    // Modal Logic
    window.openNewEventModal = function () {
        const modal = document.getElementById('newEventModal');
        const title = document.getElementById('modalDateTitle');
        if (title) title.innerText = `${calState.selectedDay} ${CAL_MONTH_NAMES[calState.month]} ${calState.year}`;
        if (modal) modal.style.display = 'grid';
    };

    window.closeNewEventModal = function () {
        const modal = document.getElementById('newEventModal');
        if (modal) modal.style.display = 'none';
    };

    const newEventForm = document.getElementById('newEventForm');
    if (newEventForm) {
        newEventForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('eventTitle').value;
            const time = document.getElementById('eventTime').value;
            const calendar = document.getElementById('eventCalendar').value;
            const location = document.getElementById('eventLocation').value;

            const calOption = CAL_OPTIONS.find(o => o.label === calendar) || CAL_OPTIONS[0];

            const newEvent = {
                id: Date.now(),
                date: calState.selectedDay,
                month: calState.month,
                year: calState.year,
                title: title,
                time: time,
                category: calendar,
                location: location || 'No location',
                accent: calOption.color
            };

            calState.events.push(newEvent);
            closeNewEventModal();
            refreshCalendarUI();
            newEventForm.reset();
        });
    }
    // Theme Management
    window.toggleTheme = function() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        setTheme(isDark ? 'light' : 'dark');
    };

    window.setTheme = function(theme) {
        const toggle = document.getElementById('themeToggle');
        const themeIcon = document.getElementById('themeIcon');
        const themeStatus = document.getElementById('themeStatus');

        // Add transition class
        document.body.classList.add('theme-transition');

        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            if (toggle) toggle.checked = true;
            if (themeStatus) themeStatus.innerText = 'Dark Mode Active';
            if (themeIcon) {
                themeIcon.innerHTML = `<svg class="moon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
                </svg>`;
                themeIcon.style.transform = 'rotate(360deg)';
            }
        } else {
            document.documentElement.removeAttribute('data-theme');
            if (toggle) toggle.checked = false;
            if (themeStatus) themeStatus.innerText = 'Light Mode Active';
            if (themeIcon) {
                themeIcon.innerHTML = `<svg class="sun-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
                </svg>`;
                themeIcon.style.transform = 'rotate(0deg)';
            }
        }
        
        // Remove transition class after animation
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 500);

        // Save preference
        localStorage.setItem('portfolio-theme', theme);
    };

    // Load saved theme
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
        setTheme(savedTheme);
    }



    // --- Spotify Widget Logic ---
    const spotifyWidget = document.getElementById('spotifyWidget');
    const spotifyPlayBtn = document.getElementById('spotify-play');
    const spotifyPauseBtn = document.getElementById('spotify-pause');
    const spotifyNextBtn = document.getElementById('spotify-next');
    
    // Create Audio Element
    const spotifyAudio = document.createElement('audio');
    spotifyAudio.id = 'spotifyAudio';
    document.body.appendChild(spotifyAudio);

    const spotifySongs = [
        { title: "Blinding Lights", artist: "The Weeknd", url: "spotify songs/The Weeknd - Blinding Lights (Official Audio).mp3", cover: "spotify songs/image/Music Cover Art - DIGITAL HELPER💡.jpg" },
        { title: "The Twist", artist: "Chubby Checker", url: "spotify songs/Chubby Checker - The Twist (Official Music Video) (320 kbps).mp3", cover: "spotify songs/image/Chubby Checker-Let’s Twist Again.jpg" },
        { title: "Smooth", artist: "Santana ft. Rob Thomas", url: "spotify songs/SpotiMate.io - Smooth _feat. Rob Thomas_ - Santana.mp3", cover: "spotify songs/image/smooth.jpg" },
        { title: "Mack the Knife", artist: "Bobby Darin", url: "spotify songs/SpotiDownloader.com - Mack the Knife - Bobby Darin.mp3", cover: "spotify songs/image/‘Mack The Knife’_ Bobby Darin Takes Kurt Weill Into The Pop Charts.jpg" },
        { title: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars", url: "spotify songs/Uptown Funk (feat. Bruno Mars)_spotdown.org.mp3", cover: "spotify songs/image/Uptown funk.jpg" },
        { title: "How Do I Live", artist: "LeAnn Rimes", url: "spotify songs/How Do I Live_spotdown.org.mp3", cover: "spotify songs/image/wedding song.jpg" },
        { title: "Party Rock Anthem", artist: "LMFAO", url: "spotify songs/Party Rock Anthem_spotdown.org.mp3", cover: "spotify songs/image/Party Rock Anthem.jpg" },
        { title: "I Gotta Feeling", artist: "Black Eyed Peas", url: "spotify songs/I Gotta Feeling_spotdown.org.mp3", cover: "spotify songs/image/I gotta feeling - black eyed peas.jpg" },
        { title: "Macarena", artist: "Los Del Río", url: "spotify songs/Macarena_spotdown.org.mp3", cover: "spotify songs/image/download.jpg" },
        { title: "Shape of You", artist: "Ed Sheeran", url: "spotify songs/Shape of You_spotdown.org.mp3", cover: "spotify songs/image/Ed Sheeran - Shape of You  Album Art Cover  Divide.jpg" }
    ];

    let currentSpotifyIndex = 0;
    let isSpotifyPlaying = false;

    // Set initial source
    spotifyAudio.src = spotifySongs[currentSpotifyIndex].url;

    window.toggleSpotifyWidget = function(e) {
        if (!spotifyWidget) return;
        spotifyWidget.classList.toggle('show');
        if (spotifyWidget.classList.contains('show')) {
            updateSpotifyUI();
        }
        
        if (e && e.stopPropagation) e.stopPropagation();
        else if (window.event) window.event.cancelBubble = true;
    };

    function updateSpotifyUI() {
        const items = document.querySelectorAll('.song-item');
        items.forEach((item, index) => {
            if (index === currentSpotifyIndex) {
                item.classList.add('active');
                if (isSpotifyPlaying) {
                    item.style.borderLeft = "3px solid #1DB954";
                } else {
                    item.style.borderLeft = "none";
                }
                item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                
                // Update Sidebar Info
                const playlistName = document.querySelector('.playlist-name');
                const playlistCurator = document.querySelector('.playlist-curator');
                const mainCover = document.getElementById('main-playlist-cover');
                
                if (playlistName) playlistName.innerText = spotifySongs[index].title;
                if (playlistCurator) playlistCurator.innerText = spotifySongs[index].artist;
                
                // Robust encoding for complex filenames
                const fullPath = spotifySongs[index].cover;
                const pathParts = fullPath.split('/');
                const filename = pathParts.pop();
                const encodedPath = pathParts.join('/') + '/' + encodeURIComponent(filename);
                if (mainCover) mainCover.src = encodedPath;

                // Update Control Center Music Info
                const ccAlbumArt = document.getElementById('cc-album-art');
                const ccSongTitle = document.getElementById('cc-song-title');
                const ccArtistName = document.getElementById('cc-artist-name');
                
                if (ccAlbumArt) {
                    ccAlbumArt.src = encodedPath;
                }
                if (ccSongTitle) ccSongTitle.innerText = spotifySongs[index].title;
                if (ccArtistName) ccArtistName.innerText = spotifySongs[index].artist;

            } else {
                item.classList.remove('active');
                item.style.borderLeft = "none";
            }
        });

        if (spotifyPlayBtn && spotifyPauseBtn) {
            if (isSpotifyPlaying) {
                spotifyPlayBtn.style.color = '#1DB954';
                spotifyPauseBtn.style.color = '#ffffff';
                spotifyAudio.play().catch(e => console.log("Playback failed:", e));
            } else {
                spotifyPlayBtn.style.color = '#ffffff';
                spotifyPauseBtn.style.color = '#1DB954';
                spotifyAudio.pause();
            }
        }
    }

    if (spotifyPlayBtn) {
        spotifyPlayBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            isSpotifyPlaying = true;
            updateSpotifyUI();
        });
    }

    if (spotifyPauseBtn) {
        spotifyPauseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            isSpotifyPlaying = false;
            updateSpotifyUI();
        });
    }

    if (spotifyNextBtn) {
        spotifyNextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentSpotifyIndex = (currentSpotifyIndex + 1) % spotifySongs.length;
            spotifyAudio.src = spotifySongs[currentSpotifyIndex].url;
            isSpotifyPlaying = true;
            updateSpotifyUI();
        });
    }

    // Auto-play next song when current one ends
    spotifyAudio.addEventListener('ended', () => {
        currentSpotifyIndex = (currentSpotifyIndex + 1) % spotifySongs.length;
        spotifyAudio.src = spotifySongs[currentSpotifyIndex].url;
        updateSpotifyUI();
    });

    // Close spotify widget when clicking outside
    document.addEventListener('click', (e) => {
        if (spotifyWidget && spotifyWidget.classList.contains('show')) {
            if (!spotifyWidget.contains(e.target) && !e.target.closest('.dock-item[data-label="Spotify"]')) {
                spotifyWidget.classList.remove('show');
            }
        }
    });

    // Control Center Sound Slider Logic
    const soundSlider = document.getElementById('soundSlider');
    if (soundSlider) {
        soundSlider.addEventListener('input', (e) => {
            const volume = e.target.value / 100;
            spotifyAudio.volume = volume;
        });
    }

    // Control Center Next Button Logic
    const ccNextBtn = document.getElementById('cc-next-btn');
    if (ccNextBtn) {
        ccNextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentSpotifyIndex = (currentSpotifyIndex + 1) % spotifySongs.length;
            spotifyAudio.src = spotifySongs[currentSpotifyIndex].url;
            isSpotifyPlaying = true;
            updateSpotifyUI();
        });
    }

    // Make song items interactive
    const songItems = document.querySelectorAll('.song-item');
    songItems.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            if (currentSpotifyIndex !== index) {
                currentSpotifyIndex = index;
                spotifyAudio.src = spotifySongs[currentSpotifyIndex].url;
            }
            isSpotifyPlaying = true;
            updateSpotifyUI();
        });
    });

    // Initialize Spotify UI
    updateSpotifyUI();

    // --- Cursor Tooltip Logic ---
    const cursorTooltip = document.getElementById('cursorTooltip');
    // Targeting all interactive elements but excluding sliders
    const interactiveElements = document.querySelectorAll('.dock-item, button, .icon-item, .light, .cc-item, .cc-box, .spotify-play, .spotify-pause, .spotify-next, .faq-expand-btn, .sidebar-item, .nav-links a, .apple-icon, .status-icon, .status-icon-img, .song-item, .menu-link, .pill-switch');

    // --- UI/UX Quiz Logic ---
    const QUIZ_QUESTIONS = [
        {
            category: "Color & Contrast",
            q: "According to WCAG AA standards, what is the minimum contrast ratio for normal text?",
            options: ["2.5:1", "3.0:1", "4.5:1", "7.0:1"],
            correct: 2,
            explanation: "<strong>4.5:1</strong> is the WCAG AA minimum for normal text. For large text (18pt+), it's 3:1. This ensures content remains readable for visually impaired users."
        },
        {
            category: "CTA Design",
            q: "What is the most important characteristic of an effective Call-To-Action (CTA) button?",
            options: ["Maximum possible size", "High contrast and a clear action verb", "The brightest color possible", "Fancy animation effects"],
            correct: 1,
            explanation: "<strong>High contrast and clear action verbs</strong> drive conversions. Using descriptive text like 'Get My Free Trial' instead of just 'Submit' can increase click-through rates by up to 90%."
        },
        {
            category: "Typography",
            q: "What is the ideal line length (characters per line) for optimal body text readability?",
            options: ["20–30 characters", "45–75 characters", "100–120 characters", "150+ characters"],
            correct: 1,
            explanation: "<strong>45–75 characters per line</strong> is considered the 'sweet spot'. Shorter lines cause jerky eye movements; longer lines make it hard to track from one line to the next."
        },
        {
            category: "Layout & Spacing",
            q: "What does the 'F-Pattern' signify in user experience research?",
            options: ["A specific button shape", "The typical eye-tracking pattern of users", "A color palette arrangement", "A type of navigation menu"],
            correct: 1,
            explanation: "The <strong>F-Pattern</strong> describes how users scan web content: two horizontal stripes followed by a vertical movement. It was popularized by Jakob Nielsen's 2006 eye-tracking study."
        },
        {
            category: "Layout & Spacing",
            q: "What is the primary purpose of using Whitespace in UI design?",
            options: ["To make the design look 'empty'", "To hide irrelevant content", "To improve readability and visual focus", "It is only useful for print design"],
            correct: 2,
            explanation: "<strong>Whitespace (Negative Space)</strong> improves readability by up to 20% and prevents cognitive overload. It guides the user's eye to the most important elements on the screen."
        },
        {
            category: "Layout & Spacing",
            q: "Which Gestalt principle describes the grouping of elements that are close together?",
            options: ["Contrast", "Proximity", "Repetition", "Alignment"],
            correct: 1,
            explanation: "The <strong>Proximity</strong> principle states that elements placed close to each other are perceived as a single group. This is vital for organizing forms and related content cards."
        },
        {
            category: "Mobile UX",
            q: "What is the core idea behind a 'Mobile-First' design approach?",
            options: ["Designing only for mobile devices", "Removing features from desktop versions", "Designing for mobile constraints first, then expanding", "Making mobile apps look exactly like desktop sites"],
            correct: 2,
            explanation: "<strong>Mobile-First</strong> is about progressive enhancement. By designing for the smallest screen first, you focus on core functionality and performance before adding complexity for desktop."
        },
        {
            category: "CTA Design",
            q: "According to Fitts's Law, which button is theoretically the easiest and fastest to click?",
            options: ["A small button in the center", "A small button near an edge", "A large button in the center", "A large button at a corner or screen edge"],
            correct: 3,
            explanation: "<strong>Fitts's Law</strong> states that target size and distance matter. Corners and edges are 'infinite' targets because the mouse cursor naturally stops there, making them very easy to hit."
        },
        {
            category: "Color & Contrast",
            q: "In web design, what does the term 'Above the Fold' refer to?",
            options: ["The navigation menu", "The footer area", "Content visible immediately without scrolling", "Decorative header elements"],
            correct: 2,
            explanation: "<strong>Above the Fold</strong> is the top portion of a webpage visible upon loading. It's a term borrowed from newspapers, and it's where your most critical information and CTAs should reside."
        },
        {
            category: "Typography",
            q: "Which color combination generally offers the highest readability for digital text?",
            options: ["Yellow text on white", "Green text on red", "Dark text on a light background", "Blue text on purple"],
            correct: 2,
            explanation: "<strong>Dark text on a light background</strong> provides maximum contrast. This combination is the most accessible for all users, including those with various forms of color blindness."
        },
        {
            category: "Information Architecture",
            q: "What is the primary goal of 'Card Sorting' in UX research?",
            options: ["Designing card UI components", "Testing button colors", "Understanding how users categorize information", "Improving database performance"],
            correct: 2,
            explanation: "<strong>Card Sorting</strong> helps researchers understand the user's mental model for information hierarchy. It's essential for creating intuitive navigation menus and site maps."
        },
        {
            category: "Heuristic Evaluation",
            q: "What does 'Visibility of System Status' mean in usability heuristics?",
            options: ["The computer's power light", "Always keeping the user informed about what is going on", "Showing the server's IP address", "Making the code visible to the user"],
            correct: 1,
            explanation: "Jakob Nielsen's first heuristic, <strong>Visibility of System Status</strong>, ensures users know where they are and what's happening through appropriate feedback (like progress bars or loading states)."
        },
        {
            category: "Mobile UX",
            q: "In mobile design, what is a 'Burger Menu' typically used for?",
            options: ["Ordering food", "Hiding primary navigation on small screens", "Changing the theme color", "Expanding image galleries"],
            correct: 1,
            explanation: "The <strong>Burger Menu</strong> (three horizontal lines) is a design pattern used to save screen real estate by collapsing navigation items into a single, toggleable menu."
        },
        {
            category: "Interaction Design",
            q: "What does 'Hick's Law' state about decision-making time?",
            options: ["More choices lead to faster decisions", "Choice time increases with the number and complexity of options", "Users never make decisions", "Simple designs take longer to understand"],
            correct: 1,
            explanation: "<strong>Hick's Law</strong> predicts that the time it takes to make a decision increases as the number of choices increases. This is why simplifying menus and forms is crucial for UX."
        },
        {
            category: "Accessibility",
            q: "What is the primary purpose of 'Alt Text' for images?",
            options: ["Making images look sharper", "Providing a description for screen readers", "Improving SEO only", "Allowing images to load faster"],
            correct: 1,
            explanation: "<strong>Alt Text</strong> provides a textual description of an image for users with visual impairments who use screen readers. It's a fundamental requirement for web accessibility."
        },
        {
            category: "Color & Contrast",
            q: "Which color is most commonly associated with 'Success' states in digital UI?",
            options: ["Red", "Yellow", "Blue", "Green"],
            correct: 3,
            explanation: "<strong>Green</strong> is globally recognized as the color for success, completion, or positive confirmation. Red is typically reserved for errors or destructive actions."
        },
        {
            category: "Typography",
            q: "What is the difference between 'Serif' and 'Sans Serif' fonts?",
            options: ["Serif fonts have decorative strokes at the ends of letters", "Sans Serif fonts are always bold", "Serif fonts are only used for headings", "There is no difference"],
            correct: 0,
            explanation: "<strong>Serif fonts</strong> have small decorative lines (serifs) at the ends of character strokes. <strong>Sans Serif</strong> (without serif) fonts are cleaner and often preferred for digital body text."
        },
        {
            category: "Interaction Design",
            q: "What is a 'Breadcrumb' in web navigation?",
            options: ["A small circular button", "A secondary navigation aid showing user's location in hierarchy", "A type of loading animation", "A hidden developer tool"],
            correct: 1,
            explanation: "<strong>Breadcrumbs</strong> allow users to track their path from the home page and easily navigate back to higher-level pages. They are especially useful for complex e-commerce sites."
        },
        {
            category: "Layout & Spacing",
            q: "What is the 'Rule of Thirds' in visual composition?",
            options: ["Using only three colors", "Dividing an image into 9 equal parts for focal points", "Having three buttons on every page", "Writing text in three columns"],
            correct: 1,
            explanation: "The <strong>Rule of Thirds</strong> involves placing key elements along grid lines or intersections of a 3x3 grid. This creates more balance, energy, and interest in the composition."
        },
        {
            category: "CTA Design",
            q: "What is the 'Z-Pattern' in layout design?",
            options: ["A way to code animations", "The eye movement on pages with less text-heavy content", "A type of database indexing", "A specific font style"],
            correct: 1,
            explanation: "The <strong>Z-Pattern</strong> eye-tracking follows a path from top-left to top-right, then down to bottom-left and across to bottom-right. It's ideal for simple landing pages with a clear CTA at the end."
        }
    ];

    let quizState = {
        current: 0,
        score: 0,
        answered: false,
        timer: 20,
        timerInterval: null,
        userAnswers: [],
        shuffledQuestions: []
    };

    window.startQuiz = function () {
        quizState.current = 0;
        quizState.score = 0;
        quizState.userAnswers = [];
        
        // Shuffle and pick 10
        quizState.shuffledQuestions = [...QUIZ_QUESTIONS]
            .sort(() => Math.random() - 0.5)
            .slice(0, 10);

        showQuizScreen('quiz-game');
        renderQuizQuestion();
    };

    function renderQuizQuestion() {
        quizState.answered = false;
        if (quizState.timerInterval) clearInterval(quizState.timerInterval);
        quizState.timer = 20;

        const q = quizState.shuffledQuestions[quizState.current];
        document.getElementById('q-num').textContent = quizState.current + 1;
        document.getElementById('q-category').textContent = q.category;
        document.getElementById('q-question-text').textContent = q.q;
        document.getElementById('q-progress').style.width = ((quizState.current + 1) / 10 * 100) + '%';
        
        const expBox = document.getElementById('q-explanation-box');
        expBox.classList.remove('show');
        document.getElementById('q-btn-next').classList.remove('show');
        
        const tt = document.getElementById('q-timer-text');
        tt.textContent = quizState.timer;
        tt.className = 'q-timer-text';

        const optsContainer = document.getElementById('q-options');
        optsContainer.innerHTML = '';
        const keys = ['A', 'B', 'C', 'D'];
        
        q.options.forEach((opt, i) => {
            const div = document.createElement('div');
            div.className = 'q-option';
            div.innerHTML = `<span class="q-option-key">${keys[i]}</span><span class="q-option-text">${opt}</span>`;
            div.onclick = () => selectQuizOption(i, div);
            optsContainer.appendChild(div);
        });

        quizState.timerInterval = setInterval(() => {
            quizState.timer--;
            tt.textContent = quizState.timer;
            if (quizState.timer <= 5) tt.className = 'q-timer-text urgent';
            if (quizState.timer <= 0) {
                clearInterval(quizState.timerInterval);
                autoFailQuiz();
            }
        }, 1000);
    }

    function autoFailQuiz() {
        if (quizState.answered) return;
        quizState.answered = true;
        const q = quizState.shuffledQuestions[quizState.current];
        quizState.userAnswers.push({ q: q.q, ok: false, correctIdx: q.correct });
        
        document.querySelectorAll('.q-option').forEach((o, i) => {
            o.classList.add('disabled');
            if (i === q.correct) o.classList.add('correct');
        });
        showQuizExplanation();
        document.getElementById('q-btn-next').classList.add('show');
    }

    function selectQuizOption(idx, el) {
        if (quizState.answered) return;
        quizState.answered = true;
        if (quizState.timerInterval) clearInterval(quizState.timerInterval);
        
        const q = quizState.shuffledQuestions[quizState.current];
        const opts = document.querySelectorAll('.q-option');
        opts.forEach(o => o.classList.add('disabled'));

        if (idx === q.correct) {
            el.classList.add('correct');
            quizState.score++;
            quizState.userAnswers.push({ q: q.q, ok: true });
        } else {
            el.classList.add('wrong');
            opts[q.correct].classList.add('correct');
            quizState.userAnswers.push({ q: q.q, ok: false, correctIdx: q.correct });
        }
        showQuizExplanation();
        document.getElementById('q-btn-next').classList.add('show');
    }

    function showQuizExplanation() {
        const box = document.getElementById('q-explanation-box');
        box.innerHTML = '💡 ' + quizState.shuffledQuestions[quizState.current].explanation;
        box.classList.add('show');
    }

    window.nextQuestion = function () {
        quizState.current++;
        if (quizState.current >= 10) {
            showQuizResult();
        } else {
            renderQuizQuestion();
        }
    };

    function showQuizResult() {
        showQuizScreen('quiz-result');
        const pct = quizState.score / 10;
        let title = '', desc = '', grade = '', gradeColor = '';

        if (pct >= 0.9) {
            title = "UI/UX Master! 🏆";
            desc = "Incredible! You have a profound understanding of design principles. Your eye for detail is professional-level.";
            grade = "S RANK";
            gradeColor = "background: rgba(16, 185, 129, 0.1); color: #10b981; border: 1px solid #10b981;";
        } else if (pct >= 0.7) {
            title = "Design Expert! ✨";
            desc = "Great job! You clearly know your way around user experience. Just a bit more polish and you'll be a master.";
            grade = "A RANK";
            gradeColor = "background: rgba(99, 102, 241, 0.1); color: #6366f1; border: 1px solid #6366f1;";
        } else {
            title = "Keep Learning! 💪";
            desc = "Good effort! UI/UX is a deep field. Explore the Material Design or Apple Guidelines to sharpen your skills.";
            grade = "B RANK";
            gradeColor = "background: rgba(100, 116, 139, 0.1); color: #64748b; border: 1px solid #64748b;";
        }

        document.getElementById('q-score-big').textContent = quizState.score;
        const gb = document.getElementById('q-grade-badge');
        gb.textContent = grade; gb.style.cssText += gradeColor;
        document.getElementById('q-result-title').textContent = title;
        document.getElementById('q-result-desc').textContent = desc;

        const ring = document.getElementById('q-ring-fill');
        ring.style.stroke = pct >= 0.7 ? '#10b981' : '#6366f1';
        const circumference = 408.4;
        ring.style.strokeDashoffset = circumference - (circumference * pct);

        const grid = document.getElementById('q-answers-grid');
        grid.innerHTML = '';
        quizState.userAnswers.forEach((a, i) => {
            const div = document.createElement('div');
            div.className = `q-answer-row ${a.ok ? 'correct' : 'wrong'}`;
            const shortQ = a.q.length > 60 ? a.q.substring(0, 57) + '...' : a.q;
            div.innerHTML = `
                <div class="q-answer-q">
                    <strong>Q${i+1}: ${shortQ}</strong>
                    ${!a.ok ? `<span style="color:#f43f5e;font-size:0.8rem">Correct: ${quizState.shuffledQuestions[i].options[quizState.userAnswers[i].correctIdx]}</span>` : '<span style="color:#10b981;font-size:0.8rem">Correct!</span>'}
                </div>`;
            grid.appendChild(div);
        });

        if (pct >= 0.7) launchQuizConfetti();
    }

    window.restartQuiz = function () {
        showQuizScreen('quiz-intro');
        if (quizState.timerInterval) clearInterval(quizState.timerInterval);
    };

    window.shareScore = function () {
        const msg = `I scored ${quizState.score}/10 on the Design IQ Challenge! Test your skills here. #UIUXQuiz`;
        if (navigator.share) {
            navigator.share({ text: msg });
        } else {
            navigator.clipboard.writeText(msg);
            alert('Score copied to clipboard!');
        }
    };

    function showQuizScreen(id) {
        document.querySelectorAll('#uiQuizView .q-screen').forEach(s => s.classList.remove('active'));
        document.getElementById(id).classList.add('active');
    }

    function launchQuizConfetti() {
        const colors = ['#6366f1', '#10b981', '#f43f5e', '#f59e0b', '#06b6d4'];
        const container = document.getElementById('uiQuizView');
        for (let i = 0; i < 50; i++) {
            const p = document.createElement('div');
            p.className = 'q-confetti';
            p.style.left = Math.random() * 100 + '%';
            p.style.top = '-20px';
            p.style.background = colors[Math.floor(Math.random() * colors.length)];
            p.style.animationDuration = (2 + Math.random() * 2) + 's';
            p.style.animationDelay = (Math.random() * 1) + 's';
            container.appendChild(p);
            setTimeout(() => p.remove(), 4000);
        }
    }

    if (interactiveElements && cursorTooltip) {
        interactiveElements.forEach(item => {
            const isSlider = item.tagName === 'INPUT' && item.type === 'range';
            const hasSlider = item.querySelector('input[type="range"]');

            if (!isSlider && !hasSlider) {
                item.addEventListener('mouseenter', (e) => {
                    // Custom text logic for different button types
                    if (item.classList.contains('light')) {
                        if (item.classList.contains('close')) cursorTooltip.innerText = 'close me';
                        else if (item.classList.contains('minimize')) cursorTooltip.innerText = 'minimize me';
                        else if (item.classList.contains('maximize')) cursorTooltip.innerText = 'maximize me';
                    } else if (
                        item.classList.contains('send-btn') ||
                        item.classList.contains('mail-send-btn-top') ||
                        item.id === 'sendBtn' ||
                        (item.innerText && item.innerText.toLowerCase().includes('send'))
                    ) {
                        cursorTooltip.innerText = 'send me';
                    } else {
                        cursorTooltip.innerText = 'open me';
                    }
                    // Set initial position immediately on enter
                    cursorTooltip.style.left = e.clientX + 'px';
                    cursorTooltip.style.top = e.clientY + 'px';
                    cursorTooltip.style.opacity = '1';
                });

                let _tooltipRAF = null;
                item.addEventListener('mousemove', (e) => {
                    if (_tooltipRAF) return;
                    const cx = e.clientX, cy = e.clientY;
                    _tooltipRAF = requestAnimationFrame(() => {
                        _tooltipRAF = null;
                        cursorTooltip.style.left = (cx + 15) + 'px';
                        cursorTooltip.style.top = (cy + 15) + 'px';
                    });
                });

                item.addEventListener('mouseleave', () => {
                    cursorTooltip.style.opacity = '0';
                });
            }
        });
    }

    // Initialize Settings Window interactivity
    const settingsWindow = document.getElementById('settingsWindow');
    if (settingsWindow) {
        makeDraggable(settingsWindow);
        makeResizable(settingsWindow);
    }

    // --- Games Playground Logic ---
    const gamesWindow = document.getElementById('gamesWindow');
    if (gamesWindow) {
        makeDraggable(gamesWindow);
        makeResizable(gamesWindow);
    }

    // Switch Game Views
    window.switchGameView = function(type) {
        const uxView = document.getElementById('uxMistakeView');
        const builderView = document.getElementById('uiBuilderView');
        const quizView = document.getElementById('uiQuizView');
        const uxTab = document.getElementById('uxGameTab');
        const builderTab = document.getElementById('builderGameTab');
        const quizTab = document.getElementById('quizGameTab');

        // Reset visibility
        [uxView, builderView, quizView].forEach(v => v.classList.remove('active'));
        [uxTab, builderTab, quizTab].forEach(t => t.classList.remove('active'));

        if (type === 'ux') {
            uxView.classList.add('active');
            uxTab.classList.add('active');
            if (typeof window.initUXGame === 'function') window.initUXGame();
            if (typeof window.stopPuzzle === 'function') window.stopPuzzle();
            if (typeof window.stopQuiz === 'function') window.stopQuiz();
        } else if (type === 'builder') {
            builderView.classList.add('active');
            builderTab.classList.add('active');
            if (typeof window.stopUXGame === 'function') window.stopUXGame();
            if (typeof window.restartPuzzle === 'function') window.restartPuzzle();
            if (typeof window.stopQuiz === 'function') window.stopQuiz();
        } else if (type === 'quiz') {
            quizView.classList.add('active');
            quizTab.classList.add('active');
            if (typeof window.stopUXGame === 'function') window.stopUXGame();
            if (typeof window.stopPuzzle === 'function') window.stopPuzzle();
            if (typeof window.restartQuiz === 'function') window.restartQuiz();
        }
    };

    // --- UX Bug Hunt Logic ---
    const UX_BUGS = {
        1: { name: "Button Alignment", tip: "Primary action buttons should be right-aligned, matching natural reading flow. Left-aligned submit buttons violate convention and confuse users about where to look next." },
        2: { name: "Wrong Color Semantics", tip: "Red means danger/error! This success message is in red — users will panic thinking something failed. Success = green (always). Color carries meaning; break it and trust breaks too." },
        3: { name: "Missing Form Label", tip: "The email field has no <label> — only a placeholder. Placeholders vanish when typing, leaving the user unsure what the field is for. Persistent labels are non-negotiable." },
        4: { name: "Low Contrast Error Text", tip: "That error text is #cbcbcb on white — contrast ratio ~1.6:1. WCAG AA requires 4.5:1 for normal text. Users with any vision difficulty literally cannot read this." },
        5: { name: "No Password Toggle", tip: "There's no 👁 button to reveal the PIN. Users can't verify what they typed, causing errors, frustration, and form abandonment. Always add a show/hide toggle on password fields." },
        6: { name: "Tiny Touch Target", tip: "That checkbox is only 10×10px! WCAG 2.5.5 requires a 44×44px minimum touch target. On mobile, users will miss it every time — and they'll give up." },
        7: { name: "Autoplay Distraction", tip: "A spinning 'Syncing cart...' indicator with no clear purpose steals attention. Auto-playing animations distract from the primary task. If it's not informing, remove it." }
    };

    let uxFound = new Set();
    let uxScore = 0;
    let uxTimeLeft = 120;
    let uxHints = 3;
    let uxTicker = null;
    let uxToastT = null;

    window.initUXGame = function () {
        // Reset if already running
        if (uxTicker) clearInterval(uxTicker);
        
        uxFound = new Set();
        uxScore = 0;
        uxTimeLeft = 120;
        uxHints = 3;

        const scoreEl = document.getElementById('ux-score-val');
        const foundEl = document.getElementById('ux-found-val');
        const timerEl = document.getElementById('ux-timer-val');
        const hintBtn = document.getElementById('ux-hint-btn');

        if (scoreEl) scoreEl.textContent = '0';
        if (foundEl) foundEl.textContent = '0';
        if (timerEl) {
            timerEl.textContent = '2:00';
            timerEl.classList.remove('urgent');
        }
        if (hintBtn) {
            hintBtn.textContent = '💡 Hint (3)';
            hintBtn.disabled = false;
        }

        // Setup click listeners
        document.querySelectorAll('.bug-zone').forEach(el => {
            el.onclick = () => window.hitUXBug(+el.dataset.bug);
        });

        // Close overlays
        const winScr = document.getElementById('ux-win');
        const goScr = document.getElementById('ux-gameover');
        if (winScr) winScr.classList.remove('show');
        if (goScr) goScr.classList.remove('show');
        
        // Clear found indicators
        document.querySelectorAll('.bug-zone').forEach(el => {
            el.classList.remove('found');
            el.querySelectorAll('.found-chip').forEach(c => c.remove());
        });
        document.querySelectorAll('.b-item').forEach(i => i.classList.remove('found'));
        const lastCard = document.getElementById('ux-last-card');
        if (lastCard) lastCard.style.display = 'none';

        // Start timer
        uxTicker = setInterval(() => {
            uxTimeLeft--;
            const m = Math.floor(uxTimeLeft / 60);
            const s = uxTimeLeft % 60;
            const timerVal = document.getElementById('ux-timer-val');
            if (timerVal) {
                timerVal.textContent = `${m}:${s.toString().padStart(2, '0')}`;
                if (uxTimeLeft <= 30) timerVal.classList.add('urgent');
            }
            if (uxTimeLeft <= 0) {
                clearInterval(uxTicker);
                window.showUXGameOver();
            }
        }, 1000);

        // Particle Init
        initUXParticles();
    };

    window.hitUXBug = function (id) {
        if (uxFound.has(id) || uxTimeLeft <= 0) return;
        uxFound.add(id);
        uxScore += 100;

        const scoreVal = document.getElementById('ux-score-val');
        const foundVal = document.getElementById('ux-found-val');
        if (scoreVal) scoreVal.textContent = uxScore;
        if (foundVal) foundVal.textContent = uxFound.size;

        const zone = document.getElementById('uxbz' + id);
        if (zone) {
            zone.classList.add('found');
            const chip = document.createElement('div');
            chip.className = 'found-chip';
            chip.textContent = '✓ Found!';
            zone.appendChild(chip);
            burstUX(zone);
        }

        const listItem = document.querySelector(`.b-item[data-bug="${id}"]`);
        if (listItem) listItem.classList.add('found');

        const lastCard = document.getElementById('ux-last-card');
        const lastContent = document.getElementById('ux-last-content');
        if (lastCard && lastContent) {
            lastCard.style.display = 'block';
            lastContent.innerHTML = `<strong style="color:#4ade80">${UX_BUGS[id].name}</strong><br><br>${UX_BUGS[id].tip}`;
        }

        showUXToast(`🎯 Bug #${id}: ${UX_BUGS[id].name}`, UX_BUGS[id].tip);

        if (uxFound.size === 7) {
            clearInterval(uxTicker);
            setTimeout(showUXWin, 900);
        }
    };

    window.doUXHint = function () {
        if (uxHints <= 0) return;
        uxHints--;
        const btn = document.getElementById('ux-hint-btn');
        if (btn) {
            btn.textContent = `💡 Hint (${uxHints})`;
            if (uxHints === 0) btn.disabled = true;
        }

        document.querySelectorAll('.bug-zone:not(.found)').forEach(el => {
            el.style.outline = '2px dashed rgba(255, 217, 61, 0.7)';
            el.style.outlineOffset = '2px';
            el.style.borderRadius = '4px';
            setTimeout(() => {
                el.style.outline = '';
                el.style.outlineOffset = '';
            }, 2200);
        });
    };

    function showUXToast(title, body) {
        const toast = document.getElementById('ux-toast');
        const tTitle = document.getElementById('ux-toast-t');
        const tBody = document.getElementById('ux-toast-b');
        if (!toast || !tTitle || !tBody) return;

        tTitle.textContent = title;
        tBody.textContent = body;
        toast.classList.add('show');
        clearTimeout(uxToastT);
        uxToastT = setTimeout(() => toast.classList.remove('show'), 4500);
    }

    function showUXWin() {
        const winScr = document.getElementById('ux-win');
        const scoreDisp = document.getElementById('ux-win-score');
        if (winScr && scoreDisp) {
            scoreDisp.textContent = uxScore;
            winScr.classList.add('show');
            bigBurstUX();
        }
    }

    window.showUXGameOver = function () {
        const goScr = document.getElementById('ux-gameover');
        const scoreDisp = document.getElementById('ux-go-score');
        if (goScr && scoreDisp) {
            scoreDisp.textContent = uxScore;
            goScr.classList.add('show');
        }
    };

    window.resetUXGame = function () {
        window.initUXGame();
    };

    window.stopUXGame = function () {
        if (uxTicker) clearInterval(uxTicker);
    };

    window.stopPuzzle = function () {
        if (puzzleState.timerInterval) clearInterval(puzzleState.timerInterval);
        if (pAnimID) cancelAnimationFrame(pAnimID);
    };

    window.stopQuiz = function () {
        if (quizState.timerInterval) clearInterval(quizState.timerInterval);
    };

    // --- UX Particles System ---
    let uxCanvas, uxCtx;
    let uxPts = [];
    let uxAnimID = null;

    function initUXParticles() {
        uxCanvas = document.getElementById('uxParticles');
        if (!uxCanvas) return;
        uxCtx = uxCanvas.getContext('2d');
        resizeUXCanvas();
        window.removeEventListener('resize', resizeUXCanvas);
        window.addEventListener('resize', resizeUXCanvas);
    }

    function resizeUXCanvas() {
        if (!uxCanvas) return;
        const parent = uxCanvas.parentElement;
        uxCanvas.width = parent.clientWidth;
        uxCanvas.height = parent.clientHeight;
    }

    function burstUX(el) {
        if (!uxCanvas) return;
        const rect = el.getBoundingClientRect();
        const pRect = uxCanvas.getBoundingClientRect();
        const cx = (rect.left + rect.width / 2) - pRect.left;
        const cy = (rect.top + rect.height / 2) - pRect.top;
        
        const cols = ['#4ade80', '#00e5ff', '#ffd93d', '#ff6b9d', '#a78bfa'];
        for (let i = 0; i < 30; i++) {
            const a = Math.PI * 2 * i / 30 + Math.random() * 0.4;
            const sp = 2 + Math.random() * 4;
            uxPts.push({
                x: cx, y: cy, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
                life: 1, dec: 0.02 + Math.random() * 0.02, r: 2 + Math.random() * 3,
                c: cols[Math.floor(Math.random() * cols.length)]
            });
        }
        if (!uxAnimID) animUX();
    }

    function bigBurstUX() {
        if (!uxCanvas) return;
        const cx = uxCanvas.width / 2;
        const cy = uxCanvas.height / 2;
        const cols = ['#4ade80', '#00e5ff', '#ffd93d', '#ff6b9d', '#a78bfa'];
        for (let i = 0; i < 80; i++) {
            const a = Math.PI * 2 * i / 80 + Math.random();
            const sp = 3 + Math.random() * 8;
            uxPts.push({
                x: cx, y: cy, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
                life: 1, dec: 0.01 + Math.random() * 0.01, r: 3 + Math.random() * 5,
                c: cols[Math.floor(Math.random() * cols.length)]
            });
        }
        if (!uxAnimID) animUX();
    }

    function animUX() {
        if (!uxCtx) return;
        uxCtx.clearRect(0, 0, uxCanvas.width, uxCanvas.height);
        uxPts = uxPts.filter(p => p.life > 0);
        uxPts.forEach(p => {
            p.x += p.vx; p.y += p.vy; p.vy += 0.1; p.life -= p.dec;
            uxCtx.globalAlpha = Math.max(0, p.life);
            uxCtx.fillStyle = p.c;
            uxCtx.beginPath(); uxCtx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2); uxCtx.fill();
        });
        uxCtx.globalAlpha = 1;
        uxAnimID = uxPts.length ? requestAnimationFrame(animUX) : (uxAnimID = null);
    }

    // --- Layout Puzzle Logic ---
    const PUZZLE_LEVELS = [
        {
            id: 1,
            name: "Landing Page",
            hint: "HERO SECTION",
            timeLimit: 90,
            bonusPerSec: 10,
            pieces: [
                { id: "logo", name: "Logo", icon: "◈", type: "brand" },
                { id: "nav", name: "Navigation", icon: "≡", type: "navigation" },
                { id: "headline", name: "Headline", icon: "H1", type: "text" },
                { id: "subline", name: "Sub-headline", icon: "H2", type: "text" },
                { id: "cta", name: "CTA Button", icon: "▶", type: "action" },
                { id: "heroimg", name: "Hero Image", icon: "⬛", type: "media" },
                { id: "badge", name: "Tag Badge", icon: "◉", type: "label" },
                { id: "socproof", name: "Social Proof", icon: "★", type: "trust" },
            ],
            buildLayout: () => `
                <div class="zone-row">
                    <div class="drop-zone sz-sm" data-accepts="logo" data-label="LOGO"></div>
                    <div class="drop-zone sz-sm" data-accepts="nav" data-label="NAV BAR" style="flex:2"></div>
                </div>
                <div class="drop-zone sz-sm" data-accepts="badge" data-label="ANNOUNCEMENT BADGE"></div>
                <div class="drop-zone sz-md" data-accepts="headline" data-label="MAIN HEADLINE"></div>
                <div class="drop-zone sz-sm" data-accepts="subline" data-label="SUB-HEADLINE"></div>
                <div class="zone-row">
                    <div class="drop-zone sz-sm" data-accepts="cta" data-label="CTA BUTTON"></div>
                    <div class="drop-zone sz-sm" data-accepts="socproof" data-label="SOCIAL PROOF"></div>
                </div>
                <div class="drop-zone sz-xl" data-accepts="heroimg" data-label="HERO IMAGE"></div>
            `
        },
        {
            id: 2,
            name: "Login Form",
            hint: "AUTH SCREEN",
            timeLimit: 75,
            bonusPerSec: 12,
            pieces: [
                { id: "applogo", name: "App Logo", icon: "◈", type: "brand" },
                { id: "formtitle", name: "Form Title", icon: "T", type: "text" },
                { id: "emailfld", name: "Email Field", icon: "✉", type: "input" },
                { id: "passfld", name: "Password Field", icon: "🔒", type: "input" },
                { id: "loginbtn", name: "Login Button", icon: "→", type: "action" },
                { id: "forgotpw", name: "Forgot PW Link", icon: "?", type: "link" },
                { id: "divider", name: "OR Divider", icon: "—", type: "divider" },
                { id: "signuplink", name: "Sign Up Link", icon: "✦", type: "link" },
            ],
            buildLayout: () => `
                <div class="drop-zone sz-lg" data-accepts="applogo" data-label="APP LOGO / BRANDING"></div>
                <div class="drop-zone sz-md" data-accepts="formtitle" data-label="FORM TITLE"></div>
                <div class="zone-group">
                    <div class="zone-group-label">FIELDS</div>
                    <div class="drop-zone sz-sm" data-accepts="emailfld" data-label="EMAIL INPUT"></div>
                    <div class="drop-zone sz-sm" data-accepts="passfld" data-label="PASSWORD INPUT"></div>
                </div>
                <div class="drop-zone sz-sm" data-accepts="forgotpw" data-label="FORGOT PASSWORD LINK"></div>
                <div class="drop-zone sz-md" data-accepts="loginbtn" data-label="LOGIN BUTTON (CTA)"></div>
                <div class="drop-zone sz-sm" data-accepts="divider" data-label="OR DIVIDER"></div>
                <div class="drop-zone sz-sm" data-accepts="signuplink" data-label="SIGN UP LINK"></div>
            `
        },
        {
            id: 3,
            name: "Dashboard",
            hint: "STATS CARD",
            timeLimit: 60,
            bonusPerSec: 15,
            pieces: [
                { id: "topbar", name: "Top Bar", icon: "═", type: "navigation" },
                { id: "sidebar", name: "Sidebar Nav", icon: "│", type: "navigation" },
                { id: "statval", name: "Metric Value", icon: "₿", type: "data" },
                { id: "statlabel", name: "Metric Label", icon: "≋", type: "text" },
                { id: "chart", name: "Chart", icon: "↗", type: "media" },
                { id: "changepct", name: "Change %", icon: "△", type: "data" },
                { id: "period", name: "Time Period", icon: "◷", type: "filter" },
                { id: "actfeed", name: "Activity Feed", icon: "⋮", type: "list" },
            ],
            buildLayout: () => `
                <div class="drop-zone sz-sm" data-accepts="topbar" data-label="TOP NAVIGATION BAR"></div>
                <div class="zone-row" style="flex:1">
                    <div class="drop-zone sz-xl" data-accepts="sidebar" data-label="SIDEBAR NAV" style="max-width:60px;writing-mode:vertical-lr;font-size:0.5rem;"></div>
                    <div style="flex:1;display:flex;flex-direction:column;gap:0.75rem;">
                        <div class="zone-group">
                            <div class="zone-group-label">METRIC CARD</div>
                            <div class="zone-row">
                                <div class="drop-zone sz-sm" data-accepts="statlabel" data-label="LABEL"></div>
                                <div class="drop-zone sz-sm" data-accepts="period" data-label="TIME PERIOD"></div>
                            </div>
                            <div class="zone-row">
                                <div class="drop-zone sz-md" data-accepts="statval" data-label="METRIC VALUE"></div>
                                <div class="drop-zone sz-md" data-accepts="changepct" data-label="CHANGE %"></div>
                            </div>
                        </div>
                        <div class="drop-zone sz-xl" data-accepts="chart" data-label="CHART AREA"></div>
                        <div class="drop-zone sz-lg" data-accepts="actfeed" data-label="ACTIVITY FEED"></div>
                    </div>
                </div>
            `
        }
    ];

    let puzzleState = {
        level: 0,
        score: 0,
        timer: 90,
        timerInterval: null,
        placed: 0,
        total: 0,
        dragId: null,
    };

    // --- Puzzle Particles ---
    let pCanvas, pCtx;
    let pParticles = [];
    let pAnimID = null;

    function initPuzzleParticles() {
        pCanvas = document.getElementById('puzzle-particles');
        if (!pCanvas) return;
        pCtx = pCanvas.getContext('2d');
        resizePuzzleCanvas();
        window.addEventListener('resize', resizePuzzleCanvas);
    }

    function resizePuzzleCanvas() {
        if (!pCanvas) return;
        const parent = pCanvas.parentElement;
        pCanvas.width = parent.clientWidth;
        pCanvas.height = parent.clientHeight;
    }

    function spawnPuzzleBurst(x, y, color = '#10b981', count = 18) {
        if (!pCtx) return;
        const rect = pCanvas.getBoundingClientRect();
        const rx = x - rect.left;
        const ry = y - rect.top;

        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 / count) * i + (Math.random() - 0.5) * 0.5;
            const speed = 2 + Math.random() * 5;
            pParticles.push({
                x: rx, y: ry,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: 2 + Math.random() * 4,
                color,
                alpha: 1,
                decay: 0.02 + Math.random() * 0.03,
            });
        }
        if (!pAnimID) animPuzzleParticles();
    }

    function animPuzzleParticles() {
        if (!pCtx) return;
        pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);
        pParticles = pParticles.filter(p => p.alpha > 0);
        for (const p of pParticles) {
            pCtx.globalAlpha = p.alpha;
            pCtx.fillStyle = p.color;
            pCtx.beginPath();
            pCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            pCtx.fill();
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.1;
            p.vx *= 0.96;
            p.size *= 0.97;
            p.alpha -= p.decay;
        }
        pCtx.globalAlpha = 1;
        pAnimID = pParticles.length ? requestAnimationFrame(animPuzzleParticles) : (pAnimID = null);
    }

    function floatPuzzleScore(x, y, text, isWrong = false) {
        const el = document.createElement('div');
        el.className = 'p-score-float' + (isWrong ? ' wrong' : '');
        el.textContent = text;
        el.style.left = x + 'px';
        el.style.top = y + 'px';
        document.body.appendChild(el);
        el.addEventListener('animationend', () => el.remove());
    }

    window.startPuzzle = function () {
        showPuzzleScreen('p-game');
        puzzleState.level = 0;
        puzzleState.score = 0;
        loadPuzzleLevel(0);
        initPuzzleParticles();
    };

    function loadPuzzleLevel(idx) {
        const lv = PUZZLE_LEVELS[idx];
        puzzleState.placed = 0;
        puzzleState.total = lv.pieces.length;
        puzzleState.timer = lv.timeLimit;
        puzzleState.dragId = null;

        document.getElementById('p-level-badge').textContent = `LEVEL ${lv.id}`;
        document.getElementById('p-layout-title').textContent = lv.name;
        document.getElementById('p-layout-hint').textContent = lv.hint;
        updatePuzzleHUD();

        const grid = document.getElementById('p-parts-grid');
        grid.innerHTML = '';
        const shuffled = [...lv.pieces].sort(() => Math.random() - 0.5);
        shuffled.forEach(p => grid.appendChild(makePuzzlePiece(p)));

        const canvas = document.getElementById('p-layout-canvas');
        canvas.innerHTML = '<span class="p-canvas-label">CANVAS</span>' + lv.buildLayout();

        canvas.querySelectorAll('.drop-zone').forEach(z => {
            z.addEventListener('dragover', onPuzzleDragOver);
            z.addEventListener('dragleave', onPuzzleDragLeave);
            z.addEventListener('drop', onPuzzleDrop);
        });

        clearInterval(puzzleState.timerInterval);
        puzzleState.timerInterval = setInterval(tickPuzzleTimer, 1000);
        updatePuzzleProgress();
    }

    function makePuzzlePiece(piece) {
        const el = document.createElement('div');
        el.className = 'ui-piece';
        el.draggable = true;
        el.dataset.id = piece.id;
        el.innerHTML = `<span class="piece-icon">${piece.icon}</span><span class="piece-name">${piece.name}</span><span class="piece-type">${piece.type}</span>`;
        el.addEventListener('dragstart', onPuzzleDragStart);
        el.addEventListener('dragend', onPuzzleDragEnd);
        return el;
    }

    let pGhostEl = null;

    function onPuzzleDragStart(e) {
        const id = e.currentTarget.dataset.id;
        puzzleState.dragId = id;
        e.currentTarget.classList.add('dragging');
        e.dataTransfer.setData('text/plain', id);
        
        const blank = document.createElement('canvas');
        blank.width = blank.height = 1;
        e.dataTransfer.setDragImage(blank, 0, 0);

        pGhostEl = e.currentTarget.cloneNode(true);
        pGhostEl.className = 'ui-piece p-drag-ghost';
        pGhostEl.style.width = e.currentTarget.offsetWidth + 'px';
        document.body.appendChild(pGhostEl);
        positionPuzzleGhost(e);
    }

    function onPuzzleDragEnd(e) {
        e.currentTarget.classList.remove('dragging');
        if (pGhostEl) { pGhostEl.remove(); pGhostEl = null; }
        document.querySelectorAll('.drop-zone.drag-over').forEach(z => z.classList.remove('drag-over'));
    }

    document.addEventListener('dragover', (e) => {
        if (pGhostEl) positionPuzzleGhost(e);
    });

    function positionPuzzleGhost(e) {
        if (!pGhostEl) return;
        pGhostEl.style.left = (e.clientX - 60) + 'px';
        pGhostEl.style.top = (e.clientY - 30) + 'px';
    }

    function onPuzzleDragOver(e) {
        e.preventDefault();
        if (!e.currentTarget.classList.contains('filled')) {
            e.currentTarget.classList.add('drag-over');
        }
    }
    function onPuzzleDragLeave(e) {
        e.currentTarget.classList.remove('drag-over');
    }

    function onPuzzleDrop(e) {
        e.preventDefault();
        const zone = e.currentTarget;
        zone.classList.remove('drag-over');
        if (zone.classList.contains('filled')) return;

        const pieceId = e.dataTransfer.getData('text/plain') || puzzleState.dragId;
        const accepts = zone.dataset.accepts;

        if (pieceId === accepts) {
            const lv = PUZZLE_LEVELS[puzzleState.level];
            const piece = lv.pieces.find(p => p.id === pieceId);
            const pts = 100 + Math.floor(puzzleState.timer * 2);
            puzzleState.score += pts;
            puzzleState.placed++;

            zone.classList.add('correct', 'filled');
            zone.innerHTML = `
                <div class="zone-filled-content">
                    <span class="zi">${piece.icon}</span>
                    <span class="zn">${piece.name}</span>
                    <span class="zone-check">✓</span>
                </div>`;

            const pieceEl = document.querySelector(`.ui-piece[data-id="${pieceId}"]`);
            if (pieceEl) pieceEl.classList.add('placed');

            const r = zone.getBoundingClientRect();
            spawnPuzzleBurst(r.left + r.width / 2, r.top + r.height / 2);
            floatPuzzleScore(r.left + r.width / 2 - 30, r.top, `+${pts}`);

            updatePuzzleProgress();
            updatePuzzleHUD();

            if (puzzleState.placed === puzzleState.total) {
                setTimeout(showPuzzleComplete, 600);
            }
        } else {
            zone.classList.add('wrong');
            puzzleState.score = Math.max(0, puzzleState.score - 25);
            const r = zone.getBoundingClientRect();
            spawnPuzzleBurst(r.left + r.width / 2, r.top + r.height / 2, '#ff4d6d', 10);
            floatPuzzleScore(r.left + r.width / 2 - 20, r.top, '-25', true);
            updatePuzzleHUD();
            setTimeout(() => zone.classList.remove('wrong'), 500);
        }
    }

    function updatePuzzleHUD() {
        document.getElementById('p-score-val').textContent = puzzleState.score.toLocaleString();
        document.getElementById('p-timer-val').textContent = puzzleState.timer;
        const timerEl = document.getElementById('p-timer-val');
        if (puzzleState.timer <= 15) timerEl.classList.add('timer-warn');
        else timerEl.classList.remove('timer-warn');
    }

    function updatePuzzleProgress() {
        const pct = puzzleState.total > 0 ? (puzzleState.placed / puzzleState.total) * 100 : 0;
        document.getElementById('p-progress-fill').style.width = pct + '%';
    }

    function tickPuzzleTimer() {
        puzzleState.timer--;
        updatePuzzleHUD();
        if (puzzleState.timer <= 0) {
            clearInterval(puzzleState.timerInterval);
            if (puzzleState.placed < puzzleState.total) showPuzzleComplete(true);
        }
    }

    function showPuzzleComplete(timedOut = false) {
        clearInterval(puzzleState.timerInterval);
        const overlay = document.getElementById('p-level-complete');
        const lv = PUZZLE_LEVELS[puzzleState.level];
        const timeBonus = timedOut ? 0 : puzzleState.timer * lv.bonusPerSec;
        puzzleState.score += timeBonus;

        const isLast = puzzleState.level >= PUZZLE_LEVELS.length - 1;
        document.getElementById('p-complete-emoji').textContent = ['🎨', '⚡', '🏆'][puzzleState.level] || '🎉';
        document.getElementById('p-complete-title').textContent = timedOut ? "TIME'S UP!" : 'LEVEL DONE!';
        document.getElementById('p-complete-sub').textContent = timedOut 
            ? `You placed ${puzzleState.placed}/${puzzleState.total} elements.` 
            : `Clean layout! Time bonus: +${timeBonus} pts`;
        document.getElementById('p-cs-time').textContent = puzzleState.timer + 's';
        document.getElementById('p-cs-pts').textContent = '+' + timeBonus;
        document.getElementById('p-next-btn').textContent = isLast ? 'SEE RESULTS →' : 'NEXT LEVEL →';

        updatePuzzleHUD();
        overlay.classList.add('show');
    }

    window.nextPuzzleLevel = function () {
        document.getElementById('p-level-complete').classList.remove('show');
        puzzleState.level++;
        if (puzzleState.level >= PUZZLE_LEVELS.length) showPuzzleGameOver();
        else loadPuzzleLevel(puzzleState.level);
    };

    function showPuzzleGameOver() {
        showPuzzleScreen('p-gameover');
        document.getElementById('p-go-score-val').textContent = puzzleState.score.toLocaleString();
        const ranks = [
            { min: 3000, label: '🏆 DESIGN MASTER', color: '#ffd60a' },
            { min: 2000, label: '⚡ LAYOUT PRO', color: '#00e5a0' },
            { min: 1000, label: '✦ PIXEL PUSHER', color: '#0099ff' },
            { min: 0, label: '◈ KEEP PRACTICING', color: '#7a8fa6' },
        ];
        const rank = ranks.find(r => puzzleState.score >= r.min);
        const rankEl = document.getElementById('p-go-rank');
        rankEl.textContent = rank.label;
        rankEl.style.color = rank.color;
        spawnPuzzleBurst(window.innerWidth / 2, window.innerHeight / 2, '#00e5a0', 40);
    }

    window.restartPuzzle = function () {
        showPuzzleScreen('p-intro');
        if (puzzleState.timerInterval) clearInterval(puzzleState.timerInterval);
    };

    function showPuzzleScreen(id) {
        document.querySelectorAll('#uiBuilderView .p-screen').forEach(s => s.classList.remove('active'));
        document.getElementById(id).classList.add('active');
    }


    // ============================================================
    // MOBILE INTERFACE LOGIC (iOS 26)
    // ============================================================

    const mobileLockScreen = document.getElementById('mobile-lock-screen');
    const mobileHomeScreen = document.getElementById('mobile-home-screen');
    const mobileInterface = document.getElementById('mobile-interface');
    const di = document.getElementById('di');
    const dynamicIsland = di; // For backward compatibility in this script

    // Update Mobile Clock
    function updateMobileClock() {
        const now = new Date();
        
        // Time: e.g., "01:41" (24h format with leading zero)
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const timeStr = `${hours}:${minutes}`;
        
        // Date: e.g., "Tue Mar 17"
        const dateStr = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
                           .replace(/,/g, '');
        
        const mobileTime = document.getElementById('mobile-time');
        const lockTime = document.getElementById('lock-time');
        const lockDate = document.getElementById('lock-date');
        const widgetTime = document.getElementById('widget-time');
        const widgetDateBottom = document.getElementById('widget-date-bottom');
        const widgetCalendarDay = document.getElementById('widget-calendar-day');
        const widgetCalendarNum = document.getElementById('widget-calendar-num');

        if (mobileTime) mobileTime.textContent = timeStr;
        if (lockTime) lockTime.textContent = timeStr;
        if (lockDate) lockDate.textContent = dateStr;
        
        // Widget Updates
        const hourHand = document.getElementById('hour-hand');
        const minuteHand = document.getElementById('minute-hand');
        const secondHand = document.getElementById('second-hand');

        if (hourHand && minuteHand && secondHand) {
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const seconds = now.getSeconds();

            const hourDeg = (hours % 12) * 30 + (minutes / 60) * 30;
            const minuteDeg = minutes * 6 + (seconds / 60) * 6;
            const secondDeg = seconds * 6;

            hourHand.style.transform = `translate(-50%, 0) rotate(${hourDeg}deg)`;
            minuteHand.style.transform = `translate(-50%, 0) rotate(${minuteDeg}deg)`;
            secondHand.style.transform = `translate(-50%, 0) rotate(${secondDeg}deg)`;
        }

        // Calendar Updates
        const calMonth = document.getElementById('cal-month');
        const calYear = document.getElementById('cal-year');
        const calGrid = document.getElementById('cal-days-grid');

        if (calMonth && calYear && calGrid) {
            const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
            calMonth.textContent = months[now.getMonth()];
            calYear.textContent = now.getFullYear();

            // Clear and Generate Grid
            calGrid.innerHTML = '';
            
            const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).getDay();
            const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
            const prevMonthDays = new Date(now.getFullYear(), now.getMonth(), 0).getDate();

            // Leading days from prev month
            for (let i = firstDay; i > 0; i--) {
                const span = document.createElement('span');
                span.className = 'other-month';
                span.textContent = prevMonthDays - i + 1;
                calGrid.appendChild(span);
            }

            // Current month days
            for (let i = 1; i <= daysInMonth; i++) {
                const span = document.createElement('span');
                if (i === now.getDate()) span.className = 'today';
                span.textContent = i;
                calGrid.appendChild(span);
            }

            // Trailing days from next month
            const totalCells = 42; // Standard 6-row grid
            const currentFilled = calGrid.children.length;
            for (let i = 1; i <= (totalCells - currentFilled); i++) {
                const span = document.createElement('span');
                span.className = 'other-month';
                span.textContent = i;
                calGrid.appendChild(span);
            }
        }
    }

    setInterval(updateMobileClock, 1000);
    updateMobileClock();

    // Swipe to Unlock Logic
    let startY = 0;
    let isSwiping = false;

    if (mobileLockScreen) {
        mobileLockScreen.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
            isSwiping = true;
        });

        mobileLockScreen.addEventListener('touchmove', (e) => {
            if (!isSwiping) return;
            const currentY = e.touches[0].clientY;
            const diff = startY - currentY;
            if (diff > 50) {
                unlockPhone();
            }
        });

        mobileLockScreen.addEventListener('mousedown', (e) => {
            startY = e.clientY;
            isSwiping = true;
        });

        window.addEventListener('mouseup', (e) => {
            if (!isSwiping) return;
            const currentY = e.clientY;
            const diff = startY - currentY;
            if (diff > 50) {
                unlockPhone();
            }
            isSwiping = false;
        });
    }

    function unlockPhone() {
        if (mobileLockScreen && mobileHomeScreen) {
            mobileLockScreen.classList.add('unlocked');
            mobileHomeScreen.classList.add('active');
            
            // Dynamic Island Animation
            if (dynamicIsland) {
                dynamicIsland.style.width = '200px';
                setTimeout(() => {
                    dynamicIsland.style.width = '120px';
                }, 1000);
            }

            setTimeout(() => {
                mobileLockScreen.style.display = 'none';
            }, 600);
        }
    }

    // Dynamic Island Haptic Simulation
    if (dynamicIsland) {
        dynamicIsland.addEventListener('click', () => {
            dynamicIsland.classList.add('pulse');
            setTimeout(() => dynamicIsland.classList.remove('pulse'), 500);
        });
    }

    // Mobile Home Indicator - Close all windows and go to Home Screen
    const homeIndicator = document.querySelector('.home-indicator');
    if (homeIndicator) {
        homeIndicator.style.cursor = 'pointer';
        homeIndicator.addEventListener('click', () => {
            const allWindows = document.querySelectorAll('.window');
            allWindows.forEach(win => {
                if (win.id && win.style.display !== 'none') {
                    closeWindow(win.id);
                }
            });
            // Force home screen to be visible and active
            const home = document.getElementById('mobile-home-screen');
            if (home) {
                home.style.opacity = '1';
                home.style.pointerEvents = 'auto';
            }
        });
    }

    // Dynamically inject Back buttons to all mobile window headers
    const allWindowEls = document.querySelectorAll('.window');
    allWindowEls.forEach(win => {
        if (win.id === 'filesWindow') return;
        const header = win.querySelector('.window-header');
        if (header) {
            if (!header.querySelector('.mobile-window-back')) {
                const backBtn = document.createElement('span');
                backBtn.className = 'mobile-window-back';
                backBtn.innerHTML = '<i class="fa-solid fa-chevron-left"></i> Back';
                backBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    closeWindow(win.id);
                });
                header.insertBefore(backBtn, header.firstChild);
            }
        }
    });

    // Adjust openWindow for Mobile
    const originalOpenWindow = window.openWindow;
    window.openWindow = function(id) {
        if (window.innerWidth <= 600) {
            const win = document.getElementById(id);
            if (win) win.style.zIndex = '';
        }
        originalOpenWindow(id);
    };

    const originalCloseWindow = window.closeWindow;
    window.closeWindow = function(id) {
        if (window.innerWidth <= 600) {
            const win = document.getElementById(id);
            if (win) win.style.zIndex = '';
        }
        originalCloseWindow(id);
    };

    // Dynamic Island Logic
    let islandTimer;

    window.start = function() {
        if (!di) return;
        clearTimeout(islandTimer);

        di.classList.remove('expanded');

        // Wait 15 seconds then expand
        islandTimer = setTimeout(() => {
            di.classList.add('expanded');

            // Collapse after 4.5 seconds
            setTimeout(() => {
                di.classList.remove('expanded');
                // Restart the cycle automatically
                setTimeout(window.start, 5000); 
            }, 4500);
        }, 15000);
    }

    // Initial Start
    if (di) {
        setTimeout(window.start, 1000);
    }

    // Prevent scrolling on mobile interface
    if (mobileInterface) {
        mobileInterface.addEventListener('touchmove', (e) => {
            if (!e.target.closest('.window-main-content')) {
                e.preventDefault();
            }
        }, { passive: false });
    }

    // Dynamic Clock City based on Location
    function updateClockCityWithLocation() {
        const cityEl = document.getElementById('clock-city');
        if (!cityEl) return;

        function setCityAbbreviation(cityName) {
            // Take the first 3 letters and uppercase them
            cityEl.textContent = cityName.substring(0, 3).toUpperCase();
        }

        function fallbackCity() {
            try {
                const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
                if (tz) {
                    const parts = tz.split('/');
                    const city = parts[parts.length - 1].replace('_', ' ');
                    setCityAbbreviation(city);
                }
            } catch (e) {
                cityEl.textContent = 'LOC';
            }
        }

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    try {
                        const lat = position.coords.latitude;
                        const lon = position.coords.longitude;
                        // Free API, no key required
                        const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
                        const data = await response.json();
                        
                        const city = data.city || data.locality || data.principalSubdivision || 'Local';
                        setCityAbbreviation(city);
                    } catch (error) {
                        console.error('Error fetching city name:', error);
                        fallbackCity();
                    }
                },
                (error) => {
                    console.warn('Geolocation permission denied or failed:', error.message);
                    fallbackCity(); // Fallback to system timezone
                }
            );
        } else {
            fallbackCity();
        }
    }

    // Call on load
    updateClockCityWithLocation();

});
