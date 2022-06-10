import NavigationBar from './components/NavigationBar/NavigationBar';

const navigationItems=[
    {
        title:'Hello World',
        url:'/hello-world',
    },
    {
        title:'Kiwi',
        url:'/kiwi',
    }
];

const NavBar=new NavigationBar();
NavBar.render(navigationItems);

const path=window.location.pathname;

if(path==='/hello-world'){
    import('HelloWorldApp/HelloWorldPage').then(HelloWorldPageModule=>{
        console.log(HelloWorldPageModule);
        const HelloWorldPage=HelloWorldPageModule.default;
        const helloWorld=new HelloWorldPage();
        helloWorld.render();
    })
}
else if(path==='/kiwi'){
    import('KiwiApp/KiwiPage').then(KiwiPageModule=>{
        console.log('TESTTTTTT');
        const KiwiPage=KiwiPageModule.default;
        const kiwi=new KiwiPage();
        kiwi.render();
    });
}

console.log('WE ARE IN DASHBOARD JS');