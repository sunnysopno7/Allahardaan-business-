








        var dashboardScreen = document.getElementById('dashboardScreen');
        var settingsPage = document.getElementById('settingsPage');
        var profileSettingsPage = document.getElementById('profileSettingsPage');
        var appSubSettingsPage = document.getElementById('appSubSettingsPage');
        var languagePage = document.getElementById('languagePage');
        var currencyPage = document.getElementById('currencyPage');
        var businessCardPage = document.getElementById('businessCardPage');
        var khataPage = document.getElementById('khataPage');
        var addContactPage = document.getElementById('addContactPage');

        var currentSelectedCardId = 1; 

        // মোবাইল ব্যাক বাটন কন্ট্রোল করার জন্য পপস্টেট ইভেন্ট লিসেনার
        window.addEventListener('popstate', function(event) {
            if (event.state && event.state.activeId) {
                // স্টেট ট্র্যাকিং করে যথাযথ পেইজ ভিজিবিলিটি ঠিক রাখা
                hideAllPages();
                var pageMap = {
                    'dashboardScreen': dashboardScreen,
                    'settingsPage': settingsPage,
                    'profileSettingsPage': profileSettingsPage,
                    'appSubSettingsPage': appSubSettingsPage,
                    'languagePage': languagePage,
                    'currencyPage': currencyPage,
                    'businessCardPage': businessCardPage,
                    'khataPage': khataPage,
                    'addContactPage': addContactPage
                };
                var target = pageMap[event.state.activeId];
                if(target) {
                    if(event.state.activeId === 'dashboardScreen') {
                        target.classList.replace('hidden', 'block');
                    } else {
                        target.classList.remove('hidden');
                    }
                }
            } else {
                // ডিফল্ট ড্যাশবোর্ড স্ক্রিন
                hideAllPages();
                dashboardScreen.classList.replace('hidden', 'block');
            }
        });

        function hideAllPages() {
            dashboardScreen.classList.replace('block', 'hidden');
            khataPage.classList.add('hidden');
            addContactPage.classList.add('hidden');
            settingsPage.classList.add('hidden');
            profileSettingsPage.classList.add('hidden');
            appSubSettingsPage.classList.add('hidden');
            languagePage.classList.add('hidden');
            currencyPage.classList.add('hidden');
            businessCardPage.classList.add('hidden');
        }

        function navigateTo(pageElement, pageId) {
            hideAllPages();
            if(pageId === 'dashboardScreen') {
                pageElement.classList.replace('hidden', 'block');
            } else {
                pageElement.classList.remove('hidden');
            }
            history.pushState({ activeId: pageId }, "");
        }

        function updateKhataPageTitle() {
            var bName = document.getElementById('inputBizName').value.trim();
            var khataTitleElem = document.getElementById('khataPageTitle');
            
            // ভাষা সিঙ্ক ট্র্যাকিং
            var selectedLanguage = document.querySelector('input[name="systemLanguage"]:checked') ? document.querySelector('input[name="systemLanguage"]:checked').value : 'en';
            
            if(bName === "Allahar Daan Variety Store" || bName === "My Shop" || bName === "") {
                if(selectedLanguage === 'bn') {
                    khataTitleElem.innerText = "আমার দোকান";
                } else {
                    khataTitleElem.innerText = "My Shop";
                }
            } else {
                khataTitleElem.innerText = bName;
            }
        }

        function openKhataPage() {
            updateKhataPageTitle();
            navigateTo(khataPage, 'khataPage');
        }
        function closeKhataPage() {
            history.back();
        }

        function openAddContactPage() {
            navigateTo(addContactPage, 'addContactPage');
        }
        function closeAddContactPage() {
            history.back();
        }
        function saveNewContact() {
            alert("Contact created successfully!");
            closeAddContactPage();
        }

        function openSettingsPage() {
            navigateTo(settingsPage, 'settingsPage');
        }
        function closeSettingsPage() {
            history.back();
        }
        function openProfileSettings() {
            navigateTo(profileSettingsPage, 'profileSettingsPage');
        }
        function closeProfileSettings() {
            history.back();
        }
        function openAppSubSettings() {
            navigateTo(appSubSettingsPage, 'appSubSettingsPage');
        }
        function closeAppSubSettings() {
            history.back();
        }
        function openLanguagePage() {
            navigateTo(languagePage, 'languagePage');
        }
        function closeLanguagePage() {
            history.back();
        }
        function openCurrencyPage() {
            navigateTo(currencyPage, 'currencyPage');
        }
        function closeCurrencyPage() {
            history.back();
        }

        function openBusinessCardPage() {
            hideAllPages();
            businessCardPage.classList.remove('hidden');
            history.pushState({ activeId: 'businessCardPage' }, "");
            syncProfileToCard();
        }
        function closeBusinessCardPage() {
            history.back();
        }

        // প্রোফাইল থেকে কার্ড ডেটা সিঙ্ক
        function syncProfileToCard() {
            var bName = document.getElementById('inputBizName').value;
            var oName = document.getElementById('inputOwnerName').value;
            var addr = document.getElementById('inputAddress').value;
            var mob = document.getElementById('inputMobile').value;
            var srv = document.getElementById('inputCustomService').value;

            document.getElementById('cardBizName1').innerText = bName;
            document.getElementById('cardService1').innerText = srv;
            document.getElementById('cardOwnerName1').innerHTML = '<i class="fa-solid fa-user text-[9px] mr-1.5 text-yellow-300"></i>' + oName;
            document.getElementById('cardAddress1').innerHTML = '<i class="fa-solid fa-location-dot text-[9px] mr-1.5 text-yellow-300"></i>' + addr;
            document.getElementById('cardMobile1').innerHTML = '<i class="fa-solid fa-phone text-[8px] mr-1"></i>' + mob;

            document.getElementById('cardBizName2').innerText = bName;
            document.getElementById('cardService2').innerText = srv;
            document.getElementById('cardOwnerName2').innerText = oName;
            document.getElementById('cardAddress2').innerText = addr;
            document.getElementById('cardMobile2').innerText = mob;
        }

        function selectCardDesign(id) {
            currentSelectedCardId = id; 
            if(id === 1) {
                document.getElementById('cardDesign1').className = "bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white p-5 rounded-2xl shadow-xl relative cursor-pointer active:scale-[0.99] transition-all duration-300 h-44 flex flex-col justify-between overflow-hidden border-2 border-blue-500/80";
                document.getElementById('cardDesign2').className = "bg-slate-900 text-gray-100 p-5 rounded-2xl shadow-xl relative cursor-pointer active:scale-[0.99] transition-all duration-300 h-44 flex flex-col justify-between overflow-hidden border-2 border-transparent";
            } else {
                document.getElementById('cardDesign1').className = "bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white p-5 rounded-2xl shadow-xl relative cursor-pointer active:scale-[0.99] transition-all duration-300 h-44 flex flex-col justify-between overflow-hidden border-2 border-transparent";
                document.getElementById('cardDesign2').className = "bg-slate-900 text-gray-100 p-5 rounded-2xl shadow-xl relative cursor-pointer active:scale-[0.99] transition-all duration-300 h-44 flex flex-col justify-between overflow-hidden border-2 border-blue-500/80";
            }
            alert("Card Design Template " + id + " Selected!");
        }

        function triggerAction(actionName) {
            var cardElement = document.getElementById('cardDesign' + currentSelectedCardId);
            var bName = document.getElementById('inputBizName').value;
            var mob = document.getElementById('inputMobile').value;
            var rawShareText = "আসসালামু আলাইকুম, আমাদের ব্যবসা প্রতিষ্ঠান '" + bName + "'-এ আপনাকে স্বাগতম। যোগাযোগঃ " + mob;
            var shareTextEncoded = encodeURIComponent(rawShareText);
            
            var renderOptions = {
                scale: 4,               
                useCORS: true, 
                allowTaint: true,
                backgroundColor: null,  
                letterRendering: true,
                logging: false
            };

            if (actionName === 'Image' || actionName === 'PDF') {
                alert(actionName + " তৈরি হচ্ছে... অনুগ্রহ করে ২/৩ সেকেন্ড অপেক্ষা করুন।");
                
                html2canvas(cardElement, renderOptions).then(function(canvas) {
                    var imgData = canvas.toDataURL('image/png');
                    
                    if (actionName === 'Image') {
                        var downloadLink = document.createElement('a');
                        downloadLink.href = imgData;
                        downloadLink.download = 'Premium_Business_Card_' + bName.replace(/\s+/g, '_') + '.png';
                        downloadLink.click();
                    } 
                    else if (actionName === 'PDF') {
                        const { jsPDF } = window.jspdf;
                        var pdfWidth = canvas.width * 0.264583 / 4; 
                        var pdfHeight = canvas.height * 0.264583 / 4;
                        var pdf = new jsPDF('l', 'mm', [pdfWidth, pdfHeight]);
                        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                        pdf.save('Premium_Business_Card_' + bName.replace(/\s+/g, '_') + '.pdf');
                    }
                });
            } 
            else if (actionName === 'Share' || actionName === 'WhatsApp' || actionName === 'Messenger') {
                html2canvas(cardElement, renderOptions).then(async function(canvas) {
                    try {
                        var blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png', 1.0));
                        var file = new File([blob], 'Business_Card.png', { type: 'image/png' });

                        if (navigator.canShare && navigator.canShare({ files: [file] })) {
                            await navigator.share({
                                files: [file],
                                title: bName,
                                text: rawShareText
                            });
                        } 
                        else {
                            if (actionName === 'WhatsApp') {
                                window.open("https://api.whatsapp.com/send?text=" + shareTextEncoded, '_blank');
                            } else if (actionName === 'Messenger') {
                                window.open("https://www.facebook.com/messages/", '_blank');
                            } else {
                                alert("Your browser does not support raw image file sharing. Download via image button instead.");
                            }
                        }
                    } catch (error) {
                        console.error('Sharing execution fault:', error);
                        if (actionName === 'WhatsApp') {
                            window.open("https://api.whatsapp.com/send?text=" + shareTextEncoded, '_blank');
                        } else if (actionName === 'Messenger') {
                            window.open("https://www.facebook.com/messages/", '_blank');
                        }
                    }
                });
            }
        }

        function saveBusinessCardConfig() {
            syncProfileToCard();
            alert("Business Card Preferences Saved Successfully!");
            closeBusinessCardPage();
        }

        function updateProfileData() {
            var bName = document.getElementById('inputBizName').value.trim();
            var oName = document.getElementById('inputOwnerName').value.trim();
            var mob = document.getElementById('inputMobile').value.trim();
            var email = document.querySelector('input[placeholder="e.g. info@allahardaan.com"]').value.trim();

            if (!bName || !oName || !mob) {
                alert("Please fill business name, owner name and mobile fields!");
                return;
            }

            var mobileRegex = /^(01)[3-9]\d{8}$/;
            if (!mobileRegex.test(mob)) {
                alert("Please provide a valid 11 digit Bangladeshi mobile number!");
                return;
            }

            if (email !== "") {
                var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    alert("Please provide a valid email ID!");
                    return;
                }
            }

            var topShop = document.getElementById('topShopName');
            topShop.innerText = bName;
            topShop.setAttribute('data-en', bName);
            topShop.setAttribute('data-bn', bName);
            
            updateKhataPageTitle();
            syncProfileToCard();
            alert("Profile metadata updated successfully!");
            closeProfileSettings();
        }

        function downloadImage() {
            const imageElement = document.getElementById('logoPreview'); 
            if (imageElement && imageElement.src) {
                const link = document.createElement('a');
                link.href = imageElement.src;
                link.download = 'business_logo.png'; 
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                alert('No image found to download!');
            }
        }

        async function shareImage() {
            const imageElement = document.getElementById('logoPreview');
            if (!imageElement || !imageElement.src) {
                alert('No image preview element to share!');
                return;
            }

            try {
                const response = await fetch(imageElement.src);
                const blob = await response.blob();
                const file = new File([blob], 'business_logo.png', { type: blob.type });

                if (navigator.canShare && navigator.canShare({ files: [file] })) {
                    await navigator.share({
                        files: [file],
                        title: 'My Business Logo',
                        text: 'Shared business image node from dashboard.'
                    });
                } else {
                    alert('Your system does not support file sharing directly via script.');
                }
            } catch (error) {
                console.error('Sharing interface crashed:', error);
            }
        }

        function saveLanguageConfig() {
            var selectedLanguage = document.querySelector('input[name="systemLanguage"]:checked').value;
            var languageNodes = document.querySelectorAll('.data-lang');
            languageNodes.forEach(function(node) {
                if (selectedLanguage === 'bn') { 
                    var bnText = node.getAttribute('data-bn');
                    if (bnText !== null) { node.innerText = bnText; }
                } else { 
                    var enText = node.getAttribute('data-en');
                    if (enText !== null) { node.innerText = enText; }
                }
            });
            updateKhataPageTitle();
            closeLanguagePage();
        }
        
        function filterCurrencies() {
            var input = document.getElementById('currencySearchInput');
            var filter = input.value.toUpperCase();
            var items = document.querySelectorAll('.currency-item');
            items.forEach(function(item) {
                var textValue = item.getAttribute('data-name') || '';
                if (textValue.toUpperCase().indexOf(filter) > -1) { item.style.display = ""; } 
                else { item.style.display = "none"; }
            });
        }
        
        function saveCurrencyConfig() {
            var selectedCurrency = document.querySelector('input[name="systemCurrency"]:checked').value;
            var symbols = document.querySelectorAll('.currency-symbol');
            symbols.forEach(function(el) { el.innerText = selectedCurrency; });
            closeCurrencyPage();
        }

        function previewImage(event) {
            const reader = new FileReader();
            reader.onload = function() {
                const output = document.getElementById('logoPreview');
                const icon = document.getElementById('logoIcon');
                output.src = reader.result;
                output.classList.remove('hidden');
                icon.classList.add('hidden');
            }
            if (event.target.files[0]) { reader.readAsDataURL(event.target.files[0]); }
        }

        // ইনিশিয়াল লোডে খাতা পেজের টাইটেল সেট করে রাখা
        updateKhataPageTitle();
        // প্রথম হিস্টোরি স্টেট পুশ করা যেন ড্যাশবোর্ড ট্র্যাকিং ব্যাক বাটনে ঠিক থাকে
        history.replaceState({ activeId: 'dashboardScreen' }, "");
    


        // =========================
        // CORE APP FOUNDATION
        // =========================

        // Global App State
        const appData = {
            products: [],
            customers: [],
            suppliers: [],
            sales: [],
            purchases: [],
            expenses: [],
            settings: {}
        };

        // Unique ID Generator
        function generateId(prefix) {
            return prefix + "_" + Date.now();
        }

        // Firebase Base Functions
        async function saveData(path, data) {
            try {
                console.log("Save Data:", path, data);
            } catch (error) {
                console.error(error);
            }
        }

        async function getData(path) {
            try {
                console.log("Get Data:", path);
            } catch (error) {
                console.error(error);
            }
        }

        async function updateData(path, data) {
            try {
                console.log("Update Data:", path, data);
            } catch (error) {
                console.error(error);
            }
        }

        async function deleteData(path) {
            try {
                console.log("Delete Data:", path);
            } catch (error) {
                console.error(error);
            }
        }

        // Navigation Controller
        function openPage(pageId) {
            hideAllPages();

            const targetPage = document.getElementById(pageId);

            if(targetPage) {
                if(pageId === 'dashboardScreen') {
                    targetPage.classList.replace('hidden', 'block');
                } else {
                    targetPage.classList.remove('hidden');
                }

                history.pushState({ activeId: pageId }, "");
            }
        }

        function closePage() {
            history.back();
        }

        // Local Cache Layer
        function saveLocalCache(key, data) {
            localStorage.setItem(key, JSON.stringify(data));
        }

        function getLocalCache(key) {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        }

        console.log("Core Foundation Ready");
    


// =========================
// SYSTEM OPTIMIZATION LAYER
// =========================

// Global Error Handler
window.addEventListener('error', function(event) {
    console.error('System Error:', event.message);
});

// Async Loading Controller
function showLoading() {
    let loader = document.getElementById('globalLoader');
    if(loader) loader.classList.remove('hidden');
}

function hideLoading() {
    let loader = document.getElementById('globalLoader');
    if(loader) loader.classList.add('hidden');
}

// Safe Input Validation
function validateText(value) {
    return value && value.trim().length > 0;
}

function validatePhone(phone) {
    return /^01[3-9]\d{8}$/.test(phone);
}

function validateAmount(amount) {
    return !isNaN(amount) && Number(amount) >= 0;
}

// Dynamic Search Engine
document.addEventListener('input', function(e) {
    if(e.target.placeholder === "Search customer/supplier...") {
        const value = e.target.value.toLowerCase();
        console.log("Searching:", value);
    }
});

// Firebase Safe Wrapper
async function safeFirebaseOperation(callback) {
    try {
        showLoading();
        await callback();
    } catch(error) {
        console.error(error);
        alert("System Error Occurred");
    } finally {
        hideLoading();
    }
}

// Local Cache Auto Save
window.addEventListener('beforeunload', function() {
    saveLocalCache('app_backup', appData);
});

// Restore Local Cache
window.addEventListener('load', function() {
    const cache = getLocalCache('app_backup');

    if(cache) {
        Object.assign(appData, cache);
        console.log("Local Cache Restored");
    }
});

// Dynamic Statistics Placeholder
function updateDashboardStats() {
    console.log("Dashboard Stats Updating...");
}

// Realtime Data Refresh Placeholder
function refreshRealtimeData() {
    console.log("Realtime Sync Ready");
}

// Modular Sections Ready
const modules = {
    products: {},
    customers: {},
    sales: {},
    purchases: {},
    reports: {},
    settings: {}
};

console.log("Optimization Layer Activated");
