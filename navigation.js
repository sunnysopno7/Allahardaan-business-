
export function showPage(pageId) {
    document.querySelectorAll('[id$="Page"], #dashboardScreen')
    .forEach(el => el.classList.add('hidden'));

    const target = document.getElementById(pageId);

    if(target){
        target.classList.remove('hidden');
    }
}
