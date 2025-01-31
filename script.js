document.addEventListener('DOMContentLoaded', function () {
    const calendar = document.getElementById('calendar');
    const prevMonthButton = document.getElementById('prevMonth');
    const nextMonthButton = document.getElementById('nextMonth');
    const currentMonthYear = document.getElementById('currentMonthYear');

    // Przeniesione dane z event.json
    const events = [
        {
            "date": "2025-01-01",
            "time": "14:00",
            "title": "Template",
            "description": "Do skopiowania."
        },
        {
            "date": "2025-11-01",
            "time": "10:00",
            "title": "Planowanie na listopad",
            "description": "Spotkanie dotyczące planów na listopad."
        }
    ];

    // Pobranie pierwszego wydarzenia lub bieżącej daty
    let currentDate = events.length > 0 ? new Date(events[0].date) : new Date();

    // Funkcja renderująca kalendarz
    function renderCalendar(date) {
        calendar.innerHTML = '';
        const year = date.getFullYear();
        const month = date.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayOfMonth = new Date(year, month, 1).getDay();

        currentMonthYear.textContent = `${getMonthName(month)} ${year}`;

        // Dodaj puste komórki dla dni poprzedniego miesiąca
        for (let i = 0; i < firstDayOfMonth; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'day empty';
            calendar.appendChild(emptyDay);
        }

        // Dodaj dni miesiąca
        for (let i = 1; i <= daysInMonth; i++) {
            const day = document.createElement('div');
            day.className = 'day';
            day.textContent = i;
            day.id = `day-${i}`;
            calendar.appendChild(day);
        }

        highlightEvents(date);
    }

    // Funkcja podświetlająca dni z wydarzeniami
    function highlightEvents(date) {
        const year = date.getFullYear();
        const month = date.getMonth();

        events.forEach(event => {
            const eventDate = new Date(event.date);
            if (eventDate.getFullYear() === year && eventDate.getMonth() === month) {
                const day = eventDate.getDate();
                const dayElement = document.getElementById(`day-${day}`);
                if (dayElement) {
                    dayElement.classList.add('has-event');
                    dayElement.setAttribute('data-tooltip', `${event.title}\n${event.description}\nGodzina: ${event.time}`);
                }
            }
        });
    }

    // Obsługa przycisku "Poprzedni miesiąc"
    prevMonthButton.addEventListener('click', function () {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    // Obsługa przycisku "Następny miesiąc"
    nextMonthButton.addEventListener('click', function () {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });

    // Funkcja zwracająca nazwę miesiąca
    function getMonthName(monthIndex) {
        const months = [
            'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
            'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'
        ];
        return months[monthIndex];
    }

    // Uruchomienie strony z pierwszym wydarzeniem
    renderCalendar(currentDate);
});
