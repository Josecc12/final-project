
export const Logout = () => {
    localStorage.removeItem('session');
    window.location.href = '/login';
    
}