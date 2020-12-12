export default {
    router: {
		linkActiveClass:'active',
      	extendRoutes(routes, resolve) {
        routes.splice(0)
        routes.push(...[
            {
				path:'/',
                component:resolve(__dirname,'pages/layout/'),
                children:[
                  	{
						path:'/',
						name:'home',
                    	component:resolve(__dirname,'pages/home/'),
					},
					{
						path:'/login',
						name:'login',
						component:resolve(__dirname,'pages/login/'),
					},
					{
						path:'/register',
						name:'register',
						component:resolve(__dirname,'pages/login/'),
					},
					{
						path:'/settings',
						name:'settings',
						component:resolve(__dirname,'pages/settings/'),
					},
					{
						path:'/article/:slug',
						name:'article',
						component:resolve(__dirname,'pages/article/'),
					},
					{
						path:'/profile/:slug',
						name:'profile',
						component:resolve(__dirname,'pages/profile/'),
					},
					{
						path:'/edit/:slug?',
						name:'edit',
						component:resolve(__dirname,'pages/edit/'),
					}
                ]
            }
        ])
      }
	},
	server: {
		host: '0.0.0.0',
		port: 3000
	},
	//插件需要注册
	plugins: [
		'~/plugins/request.js',
	]
}