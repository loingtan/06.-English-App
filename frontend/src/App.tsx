import { BrowserRouter, Routes, Route } from "react-router-dom"
import { protectedRoutes, publicRoutes } from "./routes/index"
import { DefaultLayout } from "./components/Layout"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
const queryClient = new QueryClient()
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div id="App">
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.component
              const Layout = DefaultLayout
              return <Route key={index} path={route.path} element={<Layout>{Page}</Layout>} />
            })}
            {protectedRoutes.map((route, index) => {
              const Page = route.component
              const Layout = DefaultLayout
              // if (route.path === "/profile" || route.path === "/login") {
              //   Layout = ProfileLayout
              // } else if (route.layout) {
              //   Layout = route.layout
              // } else if (route.layout === null) {
              //   Layout = Fragment
              // }
              return <Route key={index} path={route.path} element={<Layout>{Page}</Layout>} />
            })}
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
