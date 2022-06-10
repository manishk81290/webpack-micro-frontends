import './NavigationBar.scss';

class NavigationBar{
    render(navigationItems){
        const navItems=navigationItems.map(item=>{
            return `<li>
                        <a href="${item.url}">${item.title}</a>
                    </li>`
        });
        const ul=document.createElement('ul');
        ul.innerHTML=navItems.join('');
        ul.classList.add('nav-style');
        const body=document.querySelector('body');
        body.appendChild(ul);
    }
}

export default NavigationBar;