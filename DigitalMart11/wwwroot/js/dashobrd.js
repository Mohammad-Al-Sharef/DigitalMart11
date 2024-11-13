document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        alert('You must log in first.');
        window.location.href = 'login.html';
        return;
    }
    const userData = JSON.parse(loggedInUser);
    if (!userData.isAdmin) {
        alert('You do not have permission to access this page.');
        window.location.href = 'index.html';
    }
    loadEvents();
});

// Load events function
document.addEventListener('DOMContentLoaded', () => {
    loadEvents();

    // تحديد عناصر النافذة المنبثقة
    const openModalButton = document.getElementById('openModal');
    const modal = document.getElementById('addProductModal');
    const overlay = document.getElementById('overlay');
    const addProductForm = document.getElementById('addProductForm');

    // فتح النافذة المنبثقة
    openModalButton.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'block';
        overlay.style.display = 'block';
    });

    // إغلاق النافذة المنبثقة عند النقر على التراكب
    overlay.addEventListener('click', () => {
        modal.style.display = 'none';
        overlay.style.display = 'none';
    });

    // إضافة منتج جديد عند إرسال النموذج
    addProductForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // جمع البيانات من الحقول
        const newEvent = {
            name: document.getElementById('productName').value,
            description: document.getElementById('productDescription').value,
            amazonPrice: document.getElementById('amazonPrice').value,
            amazonLink: document.getElementById('amazonLink').value,
            alibabaPrice: document.getElementById('AlibabaPrice').value,
            alibabaLink: document.getElementById('AlibabaLink').value,
            aliexpressPrice: document.getElementById('AliExpressPrice').value,
            aliexpressLink: document.getElementById('AliExpressLink').value,
            sheinPrice: document.getElementById('SheinPrice').value,
            sheinLink: document.getElementById('SheinLink').value,
            noonPrice: document.getElementById('NoonPrice').value,
            noonLink: document.getElementById('NoonLink').value
        };

        // إضافة المنتج الجديد إلى LocalStorage
        const events = JSON.parse(localStorage.getItem('events')) || [];
        events.push(newEvent);
        localStorage.setItem('events', JSON.stringify(events));

        // تحديث عرض المنتجات وإغلاق النافذة المنبثقة
        loadEvents();
        modal.style.display = 'none';
        overlay.style.display = 'none';
        addProductForm.reset(); // إعادة تعيين الحقول
    });
});

// تحميل المنتجات وعرضها في الجدول
function loadEvents() {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    document.getElementById('event-count').textContent = events.length;
    const tbody = document.querySelector('.event-list tbody');
    tbody.innerHTML = '';

    events.forEach((event, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${event.name || 'N/A'}</td>
                    <td>${event.description || 'N/A'}</td>
                    <td><img src="${event.image || 'placeholder.jpg'}" alt="${event.name}" style="width: 50px;"></td>

                    <!-- Amazon -->
                    <td>${event.amazonPrice || 'N/A'}</td>
                    <td><a href="${event.amazonLink || '#'}" target="_blank">Link</a></td>

                    <!-- Alibaba -->
                    <td>${event.alibabaPrice || 'N/A'}</td>
                    <td><a href="${event.alibabaLink || '#'}" target="_blank">Link</a></td>

                    <!-- Shein -->
                    <td>${event.sheinPrice || 'N/A'}</td>
                    <td><a href="${event.sheinLink || '#'}" target="_blank">Link</a></td>

                    <!-- AliExpress -->
                    <td>${event.aliexpressPrice || 'N/A'}</td>
                    <td><a href="${event.aliexpressLink || '#'}" target="_blank">Link</a></td>

                    <!-- Noon -->
                    <td>${event.noonPrice || 'N/A'}</td>
                    <td><a href="${event.noonLink || '#'}" target="_blank">Link</a></td>

                    <td class="actions">
                        <button class="btn edit">Edit</button>
                        <button class="btn delete" onclick="deleteEvent(${index})">Delete</button>
                    </td>`;
        tbody.appendChild(row);
    });
}

// حذف المنتج
function deleteEvent(index) {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    events.splice(index, 1);
    localStorage.setItem('events', JSON.stringify(events));
    loadEvents();
}

// addProductForm


document.getElementById('addProductForm').addEventListener('submit', (event) => {
    event.preventDefault();
    modal.style.display = 'none';
    overlay.style.display = 'none';

    const newProduct = {
        name: document.getElementById('productName').value,
        description: document.getElementById('productDescription').value,

        // Amazon
        amazonPrice: document.getElementById('amazonPrice').value,
        amazonLink: document.getElementById('amazonLink').value,

        // Alibaba
        alibabaPrice: document.getElementById('alibabaPrice').value,
        alibabaLink: document.getElementById('alibabaLink').value,

        // Shein
        sheinPrice: document.getElementById('sheinPrice').value,
        sheinLink: document.getElementById('sheinLink').value,

        // AliExpress
        aliexpressPrice: document.getElementById('aliexpressPrice').value,
        aliexpressLink: document.getElementById('aliexpressLink').value,

        // Noon
        noonPrice: document.getElementById('noonPrice').value,
        noonLink: document.getElementById('noonLink').value,
    };

    const events = JSON.parse(localStorage.getItem('events')) || [];
    events.push(newProduct);
    localStorage.setItem('events', JSON.stringify(events));
    loadEvents();
});

