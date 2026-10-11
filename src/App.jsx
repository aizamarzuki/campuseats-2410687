import Header from './Components/Header.jsx'
import VendorCard from './Components/VendorCard.jsx'
import MenuItemCard from './Components/MenuItemCard.jsx'
import Footer from './Components/Footer.jsx'
function App() {
 return (
 <>
 <Header />
 <main className="container">
 <section>
 <h2 className="section-title">Today's vendors</h2>
 <VendorCard />
 </section>
 <section>
 <h2 className="section-title">Popular items</h2>
 <div className="grid">
 <MenuItemCard />
 </div>
 </section>
 </main>
 <Footer />
 </>
 )
}
export default App