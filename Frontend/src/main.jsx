import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthLayout} from './components/index.js'
import Home from './pages/Home.jsx'
import EditPost from './pages/EditPost.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Allposts from './pages/Allposts.jsx'
import AddPost from './pages/AddPost.jsx'
import Post from './pages/Post.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'/login',
        element:(
          <AuthLayout authentication={false}>
            <Login/>
          </AuthLayout>
        )
      },
      {
        path:'/editpost',
        element:(
          <AuthLayout authentication>
            {/* yani true hi hai */}
              <EditPost/>
          </AuthLayout>
        )
      },
      {
        path:'/signup',
        element:(
          <AuthLayout authentication={false} >
            <Signup/>
          </AuthLayout>
        )
      },
      {
        path:'/all-post',
        element:(
          <AuthLayout authentication={true}>
            <Allposts/>
          </AuthLayout>
        )
      },
      { 
        path:'/add-post',
        element:(
          <AuthLayout authentication >
            <AddPost/>
          </AuthLayout>
        )
      },
      {
        path:'/edit-post/:postId',//edit post ke pageme jakar dekho useParams isi liye use kiya hai
        element:(
          <AuthLayout authentication>
            <EditPost/>
          </AuthLayout>
        )
      },
      {
        path:'/post/:postId',
        element:<Post/>
      }
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store} >
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
    </Provider>
  </StrictMode>,
)
