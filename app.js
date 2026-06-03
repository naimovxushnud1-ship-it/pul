// ==========================================
// KOPILKA - Moliyaviy Tartib & Jamg'arma
// JavaScript Application
// ==========================================

class KopilkaApp {
    constructor() {
        this.currentDate = new Date();
        this.currentYear = this.currentDate.getFullYear();
        this.currentMonth = this.currentDate.getMonth();
        this.savingsData = this.loadData() || {};
        this.savingsGoal = this.loadGoal() || 10000000;
        this.selectedDate = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateUI();
        this.renderCalendar();
    }

    setupEventListeners() {
        // Calendar navigation
        document.getElementById('prev-month').addEventListener('click', () => this.previousMonth());
        document.getElementById('next-month').addEventListener('click', () => this.nextMonth());

        // Modal controls
        document.getElementById('edit-goal-btn').addEventListener('click', () => this.openGoalModal());
        document.getElementById('close-goal-modal').addEventListener('click', () => this.closeGoalModal());
        document.getElementById('cancel-goal-btn').addEventListener('click', () => this.closeGoalModal());
        document.getElementById('save-goal-btn').addEventListener('click', () => this.saveGoal());

        document.getElementById('close-saving-modal').addEventListener('click', () => this.closeSavingModal());
        document.getElementById('save-saving-btn').addEventListener('click', () => this.saveSaving());
        document.getElementById('delete-saving-btn').addEventListener('click', () => this.deleteSaving());
        document.getElementById('fast-add-btn').addEventListener('click', () => this.quickAddToday());

        // Quick amount preset buttons
        document.querySelectorAll('.preset-amount-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const amount = parseInt(btn.dataset.value);
                document.getElementById('saving-amount').value = amount;
            });
        });

        // Modal overlay click to close
        document.getElementById('saving-modal').addEventListener('click', (e) => {
            if (e.target.id === 'saving-modal') this.closeSavingModal();
        });
        document.getElementById('goal-modal').addEventListener('click', (e) => {
            if (e.target.id === 'goal-modal') this.closeGoalModal();
        });
    }

    // ==========================================
    // Calendar Management
    // ==========================================

    renderCalendar() {
        const year = this.currentYear;
        const month = this.currentMonth;
        
        // Update header
        const monthName = this.getMonthName(month);
        document.getElementById('current-month-year').textContent = `${monthName} ${year}`;

        // Get calendar days
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrevMonth = new Date(year, month, 0).getDate();

        const daysGrid = document.getElementById('days-grid');
        daysGrid.innerHTML = '';

        // Previous month's days
        for (let i = firstDay - 1; i >= 0; i--) {
            const day = daysInPrevMonth - i;
            const dayCell = this.createDayCell(day, month - 1, year, true);
            daysGrid.appendChild(dayCell);
        }

        // Current month's days
        const today = new Date();
        for (let day = 1; day <= daysInMonth; day++) {
            const isToday = 
                day === today.getDate() && 
                month === today.getMonth() && 
                year === today.getFullYear();
            
            const dayCell = this.createDayCell(day, month, year, false, isToday);
            daysGrid.appendChild(dayCell);
        }

        // Next month's days
        const totalCells = daysGrid.children.length;
        const remainingCells = 42 - totalCells;
        for (let day = 1; day <= remainingCells; day++) {
            const dayCell = this.createDayCell(day, month + 1, year, true);
            daysGrid.appendChild(dayCell);
        }

        this.updateYearProgress();
    }

    createDayCell(day, month, year, isOtherMonth = false, isToday = false) {
        const cell = document.createElement('div');
        cell.className = 'day-cell';

        // Normalize month and year
        if (month < 0) {
            month = 11;
            year--;
        } else if (month > 11) {
            month = 0;
            year++;
        }

        const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const savedAmount = this.savingsData[dateKey];

        if (isOtherMonth) {
            cell.classList.add('other-month');
        } else {
            cell.addEventListener('click', () => this.openSavingModal(dateKey, new Date(year, month, day)));
        }

        if (isToday) {
            cell.classList.add('today');
        }

        if (savedAmount) {
            cell.classList.add('filled');
            cell.innerHTML = `
                <span>${day}</span>
                <span class="day-amount">${this.formatNumber(savedAmount)} UZS</span>
            `;
        } else {
            cell.textContent = day;
        }

        return cell;
    }

    previousMonth() {
        if (this.currentMonth === 0) {
            this.currentMonth = 11;
            this.currentYear--;
        } else {
            this.currentMonth--;
        }
        this.renderCalendar();
    }

    nextMonth() {
        if (this.currentMonth === 11) {
            this.currentMonth = 0;
            this.currentYear++;
        } else {
            this.currentMonth++;
        }
        this.renderCalendar();
    }

    getMonthName(month) {
        const months = [
            'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun',
            'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'
        ];
        return months[month];
    }

    // ==========================================
    // Saving Management
    // ==========================================

    openSavingModal(dateKey, date) {
        this.selectedDate = dateKey;
        const savedAmount = this.savingsData[dateKey];

        document.getElementById('modal-date-title').textContent = 
            this.formatDate(date);

        if (savedAmount) {
            document.getElementById('saving-amount').value = savedAmount;
            document.getElementById('saving-comment').value = 
                this.savingsData[`${dateKey}-comment`] || '';
            document.getElementById('delete-saving-btn').classList.remove('hidden');
        } else {
            document.getElementById('saving-amount').value = '';
            document.getElementById('saving-comment').value = '';
            document.getElementById('delete-saving-btn').classList.add('hidden');
        }

        document.getElementById('saving-modal').classList.add('active');
    }

    closeSavingModal() {
        document.getElementById('saving-modal').classList.remove('active');
        this.selectedDate = null;
    }

    saveSaving() {
        const amount = parseInt(document.getElementById('saving-amount').value);
        const comment = document.getElementById('saving-comment').value;

        if (!amount || amount < 1) {
            alert('Iltimos, to\'g\'ri miqdor kiriting!');
            return;
        }

        this.savingsData[this.selectedDate] = amount;
        if (comment) {
            this.savingsData[`${this.selectedDate}-comment`] = comment;
        }

        this.saveData();
        this.closeSavingModal();
        this.updateUI();
        this.renderCalendar();
    }

    deleteSaving() {
        if (confirm('Ushbu qo\'shilmani o\'chirmoqchisiz?')) {
            delete this.savingsData[this.selectedDate];
            delete this.savingsData[`${this.selectedDate}-comment`];
            this.saveData();
            this.closeSavingModal();
            this.updateUI();
            this.renderCalendar();
        }
    }

    quickAddToday() {
        const today = new Date();
        const dateKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
        this.openSavingModal(dateKey, today);
    }

    // ==========================================
    // Goal Management
    // ==========================================

    openGoalModal() {
        document.getElementById('goal-amount').value = this.savingsGoal;
        document.getElementById('goal-modal').classList.add('active');
    }

    closeGoalModal() {
        document.getElementById('goal-modal').classList.remove('active');
    }

    saveGoal() {
        const goal = parseInt(document.getElementById('goal-amount').value);

        if (!goal || goal < 1000) {
            alert('Iltimos, 1000 dan katta maqsad kiriting!');
            return;
        }

        this.savingsGoal = goal;
        localStorage.setItem('kopilka_goal', goal);
        this.closeGoalModal();
        this.updateUI();
    }

    // ==========================================
    // UI Updates
    // ==========================================

    updateUI() {
        this.updateStats();
        this.updateLedger();
    }

    updateStats() {
        const totalSaved = this.getTotalSaved();
        const remaining = Math.max(0, this.savingsGoal - totalSaved);
        const goalPercent = Math.round((totalSaved / this.savingsGoal) * 100);
        const daysLeft = this.getDaysLeftInYear();
        const dailyRecommendation = daysLeft > 0 ? Math.ceil(remaining / daysLeft) : 0;

        document.getElementById('total-saved').textContent = this.formatCurrency(totalSaved);
        document.getElementById('savings-goal').textContent = this.formatCurrency(this.savingsGoal);
        document.getElementById('remaining-amount').textContent = `Qoldi: ${this.formatCurrency(remaining)}`;
        document.getElementById('goal-percent').textContent = `${goalPercent}% bajarildi`;
        document.getElementById('daily-recommendation').textContent = this.formatCurrency(dailyRecommendation);
        document.getElementById('days-left').textContent = `Yil oxirigacha ${daysLeft} kun qoldi`;

        // Update progress bars
        document.getElementById('goal-progress-bar').style.width = `${Math.min(100, goalPercent)}%`;

        // Streak calculations
        const streak = this.calculateStreak();
        const maxStreak = this.getMaxStreak();
        document.getElementById('savings-streak').textContent = `${streak} kun`;
        document.getElementById('max-streak').textContent = `Eng yaxshi natija: ${maxStreak} kun`;
    }

    updateLedger() {
        const ledgerBody = document.getElementById('ledger-body');
        const transactions = this.getRecentTransactions(10);

        if (transactions.length === 0) {
            ledgerBody.innerHTML = `
                <tr class="empty-row">
                    <td colspan="4">Hozircha tranzaksiyalar yo'q. Kalendardan kunni tanlab pul qo'shing!</td>
                </tr>
            `;
            return;
        }

        ledgerBody.innerHTML = transactions.map(tx => `
            <tr>
                <td>${this.formatDate(new Date(tx.date))}</td>
                <td>${this.formatCurrency(tx.amount)}</td>
                <td>${tx.comment || '-'}</td>
                <td>
                    <button class="icon-btn" onclick="app.openSavingModal('${tx.dateKey}', new Date('${tx.date}'))">
                        <i class="fa-solid fa-edit"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }

    updateYearProgress() {
        const today = new Date();
        const yearStart = new Date(today.getFullYear(), 0, 1);
        const yearEnd = new Date(today.getFullYear(), 11, 31);
        
        const daysPassed = Math.floor((today - yearStart) / (1000 * 60 * 60 * 24)) + 1;
        const totalDays = Math.floor((yearEnd - yearStart) / (1000 * 60 * 60 * 24)) + 1;
        
        const percent = Math.round((daysPassed / totalDays) * 100);
        
        document.getElementById('year-days-ratio').textContent = `Kun: ${daysPassed} / ${totalDays}`;
        document.getElementById('year-progress-bar').style.width = `${percent}%`;
    }

    // ==========================================
    // Calculations
    // ==========================================

    getTotalSaved() {
        let total = 0;
        for (const key in this.savingsData) {
            if (!key.endsWith('-comment') && typeof this.savingsData[key] === 'number') {
                total += this.savingsData[key];
            }
        }
        return total;
    }

    getDaysLeftInYear() {
        const today = new Date();
        const yearEnd = new Date(today.getFullYear(), 11, 31);
        return Math.ceil((yearEnd - today) / (1000 * 60 * 60 * 24));
    }

    calculateStreak() {
        const today = new Date();
        let streak = 0;

        for (let i = 0; i < 365; i++) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

            if (this.savingsData[dateKey]) {
                streak++;
            } else {
                break;
            }
        }

        return streak;
    }

    getMaxStreak() {
        let maxStreak = 0;
        let currentStreak = 0;

        const sortedDates = Object.keys(this.savingsData)
            .filter(key => !key.endsWith('-comment') && typeof this.savingsData[key] === 'number')
            .sort();

        for (const dateKey of sortedDates) {
            const prevDate = new Date(dateKey);
            prevDate.setDate(prevDate.getDate() - 1);
            const prevDateKey = `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, '0')}-${String(prevDate.getDate()).padStart(2, '0')}`;

            if (sortedDates.includes(prevDateKey)) {
                currentStreak++;
            } else {
                currentStreak = 1;
            }

            maxStreak = Math.max(maxStreak, currentStreak);
        }

        return maxStreak;
    }

    getRecentTransactions(limit = 10) {
        const transactions = [];

        for (const key in this.savingsData) {
            if (!key.endsWith('-comment') && typeof this.savingsData[key] === 'number') {
                transactions.push({
                    dateKey: key,
                    date: key,
                    amount: this.savingsData[key],
                    comment: this.savingsData[`${key}-comment`] || ''
                });
            }
        }

        return transactions
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, limit);
    }

    // ==========================================
    // Data Management
    // ==========================================

    saveData() {
        localStorage.setItem('kopilka_data', JSON.stringify(this.savingsData));
    }

    loadData() {
        const data = localStorage.getItem('kopilka_data');
        return data ? JSON.parse(data) : null;
    }

    saveGoal() {
        const goal = parseInt(document.getElementById('goal-amount').value);

        if (!goal || goal < 1000) {
            alert('Iltimos, 1000 dan katta maqsad kiriting!');
            return;
        }

        this.savingsGoal = goal;
        localStorage.setItem('kopilka_goal', goal);
        this.closeGoalModal();
        this.updateUI();
        this.renderCalendar();
    }

    loadGoal() {
        const goal = localStorage.getItem('kopilka_goal');
        return goal ? parseInt(goal) : 10000000;
    }

    // ==========================================
    // Formatting Utilities
    // ==========================================

    formatCurrency(amount) {
        return this.formatNumber(amount) + ' UZS';
    }

    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    formatDate(date) {
        const day = date.getDate();
        const month = this.getMonthName(date.getMonth());
        const year = date.getFullYear();
        return `${day}-${month}, ${year}-yil`;
    }
}

// Initialize app when DOM is ready
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new KopilkaApp();
    console.log('✅ KOPILKA app ishga tushdi!');
});

// Auto-update UI every minute for real-time progress
setInterval(() => {
    if (app) {
        app.updateYearProgress();
    }
}, 60000);