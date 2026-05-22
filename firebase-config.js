
        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
        import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";
        import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";

        const firebaseConfig = {
            apiKey: "AIzaSyDI7PWtKHqwTYooaOYJM-WM7fC8nrFNxvg",
            authDomain: "allahardaan-business-solution.firebaseapp.com",
            databaseURL: "https://allahardaan-business-solution-default-rtdb.firebaseio.com",
            projectId: "allahardaan-business-solution",
            storageBucket: "allahardaan-business-solution.firebasestorage.app",
            messagingSenderId: "264163019914",
            appId: "1:264163019914:web:4a65f4d956b1ad35ebf173",
            measurementId: "G-YR2PS5QTJ2"
        };

        const app = initializeApp(firebaseConfig);
        const analytics = getAnalytics(app);
        const db = getDatabase(app);
        const connectedRef = ref(db, ".info/connected");

        console.log("Firebase Connected Successfully");
        
        const statusDot = document.getElementById('statusDot');
        const statusText = document.getElementById('statusText');

        onValue(connectedRef, (snap) => {
            if (snap.val() === true) {
                statusText.innerText = "Online";
                statusText.className = "text-green-300";
                statusDot.className = "w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_6px_#4ade80]";
            } else {
                statusText.innerText = "Offline";
                statusText.className = "text-red-300";
                statusDot.className = "w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_6px_#ef4444]";
            }
        });
    