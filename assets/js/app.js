document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('.sim-form');
    const feedbackModalEl = document.getElementById('feedbackModal');
    const feedbackText = feedbackModalEl.querySelector('.modal-body p');
    const feedbackModal = new bootstrap.Modal(feedbackModalEl);

    forms.forEach(form => {
        form.addEventListener('submit', event => {
            event.preventDefault();
            const message = form.dataset.success || 'Acción completada en el prototipo.';
            feedbackText.textContent = message;
            feedbackModal.show();
            form.reset();
        });
    });

    const sessionToggle = document.getElementById('sessionToggle');
    const loginModalEl = document.getElementById('loginModal');
    const loginModal = new bootstrap.Modal(loginModalEl);
    const loginForm = document.getElementById('loginForm');
    const loginAlert = document.getElementById('loginAlert');
    const portalSection = document.getElementById('portalSection');
    const portalWrapper = document.getElementById('portalWrapper');
    const guestWrapper = document.getElementById('guestWrapper');
    const activeUser = document.getElementById('activeUser');

    let currentUser = null;

    const logout = () => {
        currentUser = null;
        guestWrapper.classList.remove('d-none');
        portalWrapper.classList.add('d-none');
        portalSection.classList.add('d-none');
        activeUser.textContent = '—';
        sessionToggle.textContent = 'Iniciar sesión';
    };

    sessionToggle.addEventListener('click', () => {
        if (!currentUser) {
            loginModal.show();
        } else {
            logout();
        }
    });

    loginForm.addEventListener('submit', event => {
        event.preventDefault();
        const user = document.getElementById('loginUsuario').value.trim();
        const pass = document.getElementById('loginClave').value.trim();

        if (user === 'admin' && pass === '123') {
            currentUser = user;
            loginAlert.classList.add('d-none');
            loginForm.reset();
            loginModal.hide();
            guestWrapper.classList.add('d-none');
            portalWrapper.classList.remove('d-none');
            portalSection.classList.remove('d-none');
            activeUser.textContent = currentUser;
            sessionToggle.textContent = 'Cerrar sesión';
            feedbackText.textContent = 'Bienvenido admin, panel habilitado.';
            feedbackModal.show();
        } else {
            loginAlert.classList.remove('d-none');
        }
    });

    document.getElementById('year').textContent = new Date().getFullYear();
});
