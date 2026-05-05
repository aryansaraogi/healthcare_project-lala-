function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    window.scrollTo(0, 0);
}

/* ============ HEALTH LOGIC ============ */
function analyzeHealth(e) {
    e.preventDefault();
    const selected = Array.from(
        document.querySelectorAll('input[name="symptoms"]:checked')
    ).map(c => c.value);

    const results = [];
    const suggestions = [];
    let risk = "Low 🟢";

    if (selected.includes("fever")) {
        results.push("🤒 You may be experiencing an infection as fever is the body's natural response to fight bacteria or viruses.");
        suggestions.push("💧 Stay hydrated and take proper rest.");
    }
    if (selected.includes("cough")) {
        results.push("😷 Cough may indicate irritation or infection in your respiratory system.");
        suggestions.push("☕ Avoid cold drinks and take warm fluids.");
    }
    if (selected.includes("headache")) {
        results.push("😖 Headache can be caused by stress, dehydration, or lack of sleep.");
        suggestions.push("🛌 Take proper rest and reduce screen time.");
    }
    if (selected.includes("fatigue") || selected.includes("weakness")) {
        results.push("⚡ Persistent fatigue or weakness may indicate low energy levels or nutritional deficiency.");
        suggestions.push("🍗 Eat protein-rich and nutritious food.");
    }
    if (selected.includes("vomiting") || selected.includes("nausea")) {
        results.push("🤢 These symptoms may be related to digestive issues or possible food poisoning.");
        suggestions.push("🚫 Avoid outside food and drink plenty of fluids.");
    }
    if (selected.includes("chest pain")) {
        results.push("❤️ Chest pain could indicate a serious heart or lung condition and should not be ignored.");
        suggestions.push("🚨 Consult a doctor immediately.");
        risk = "High 🔴";
    }
    if (selected.includes("anxiety")) {
        results.push("🧠 Anxiety may be linked to mental stress, overthinking, or emotional imbalance.");
        suggestions.push("🧘 Practice meditation and relaxation techniques.");
    }
    if (selected.includes("sleep problems")) {
        results.push("😴 Sleep problems may indicate poor sleep habits or stress.");
        suggestions.push("🌙 Maintain a proper sleep schedule.");
    }
    if (selected.includes("acidity")) {
        results.push("🔥 Acidity is often caused by unhealthy eating habits or spicy food.");
        suggestions.push("🥗 Avoid oily and spicy food.");
    }
    if (selected.includes("hair fall")) {
        results.push("💇 Hair fall can be due to nutritional deficiency or stress.");
        suggestions.push("💊 Take vitamins and maintain a balanced diet.");
    }
    if (selected.includes("frequent urination")) {
        results.push("🩸 Frequent urination may be a sign of high blood sugar or diabetes risk.");
        suggestions.push("🧪 Check your blood sugar levels.");
    }
    if (selected.includes("body pain")) {
        results.push("💪 Body pain may be due to fatigue, infection, or lack of proper rest.");
        suggestions.push("🛌 Take rest and stay hydrated.");
    }
    if (selected.includes("stomach pain")) {
        results.push("🍽️ Stomach pain may be related to digestive issues or unhealthy food intake.");
        suggestions.push("🥣 Eat light food and avoid junk food.");
    }
    if (selected.includes("sore throat")) {
        results.push("🗣️ Sore throat may indicate throat infection or cold.");
        suggestions.push("🍵 Drink warm water and avoid cold items.");
    }

    if (selected.includes("fever") && selected.includes("cough")) {
        results.push("🔥 Combination of fever and cough strongly indicates a viral or respiratory infection.");
        suggestions.push("🛌 Take proper rest and consult a doctor if symptoms persist.");
    }
    if (selected.includes("fatigue") && selected.includes("hair fall")) {
        results.push("⚠️ Fatigue along with hair fall may indicate nutritional deficiency.");
        suggestions.push("🥦 Improve diet with vitamins and minerals.");
    }

    if (selected.length >= 4) risk = "Moderate 🟠";
    if (selected.length >= 8) risk = "High 🔴";

    if (results.length === 0) {
        results.push("🙂 No major symptoms detected, but maintain a healthy lifestyle.");
        suggestions.push("🥗 Eat healthy, exercise regularly, and stay hydrated.");
    }

    document.getElementById('result-conditions').innerHTML =
        results.map(r => `<p>👉 ${r}</p>`).join('');
    document.getElementById('result-suggestions').innerHTML =
        suggestions.map(s => `<p>✔ ${s}</p>`).join('');
    document.getElementById('result-risk').textContent = risk;

    showPage('health-result');
}

/* ============ DIET LOGIC ============ */
function analyzeDiet(e) {
    e.preventDefault();
    const food = document.getElementById('food_type').value;
    let result;
    if (food === "apple") {
        result = { food: "Healthy Food 🥗", protein: "2g", carbs: "20g", fiber: "5g", calories: "90 kcal", suggestion: "Great choice! Keep eating clean 💚" };
    } else if (food === "rice") {
        result = { food: "Rice 🍚", protein: "4g", carbs: "45g", fiber: "1g", calories: "200 kcal", suggestion: "Eat with dal or veggies 👍" };
    } else if (food === "milk") {
        result = { food: "Milk 🥛", protein: "8g", carbs: "12g", fiber: "0g", calories: "150 kcal", suggestion: "Good for bones 💪" };
    } else if (food === "burger") {
        result = { food: "Junk Food 🍔", protein: "10g", carbs: "50g", fiber: "2g", calories: "400 kcal", suggestion: "Avoid junk frequently ❌" };
    } else if (food === "chicken") {
        result = { food: "Protein Rich Food 🍗", protein: "25g", carbs: "5g", fiber: "0g", calories: "250 kcal", suggestion: "Great for muscle growth 💪" };
    } else {
        result = { food: "Mixed Food 🍽", protein: "6g", carbs: "25g", fiber: "3g", calories: "180 kcal", suggestion: "Maintain balance ⚖️" };
    }

    document.getElementById('d-food').textContent = result.food;
    document.getElementById('d-protein').textContent = result.protein;
    document.getElementById('d-carbs').textContent = result.carbs;
    document.getElementById('d-fiber').textContent = result.fiber;
    document.getElementById('d-calories').textContent = result.calories;
    document.getElementById('d-suggestion').textContent = result.suggestion;

    showPage('diet-result');
}

/* ============ BMI LOGIC ============ */
function calcBMI(e) {
    e.preventDefault();
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const bmi = weight / Math.pow(height / 100, 2);

    let result, color, suggestion;
    if (bmi < 18.5)        { result = "Underweight 😟";    color = "#00bcd4"; suggestion = "Eat more nutritious food 🍎"; }
    else if (bmi < 25)     { result = "Normal Weight ✅"; color = "#00e676"; suggestion = "Maintain your lifestyle 💪"; }
    else if (bmi < 30)     { result = "Overweight ⚠️";    color = "#ff9800"; suggestion = "Exercise more 🏃‍♀️"; }
    else                   { result = "Obese ❌";          color = "#ff5252"; suggestion = "Consult doctor + strict diet 🥗"; }

    document.getElementById('bmi-result').innerHTML = `
        <div class="bmi-result-box" style="background:${color}; border:1px solid ${color};">
            <h2 style="color:#fff;">${result}</h2>
            <p><b>Your BMI:</b> ${bmi.toFixed(2)}</p>
            <p>💡 ${suggestion}</p>
        </div>
    `;
}
