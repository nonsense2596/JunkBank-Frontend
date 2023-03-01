import React, {useState} from "react";
import Header from "./components/Layout/Header";
import Hero from "./components/Hero";
import Foods from "./components/Foods/Foods";
import Footer from "./components/Layout/Footer";
import CartModal from "./components/Cart/CartModal";

function App() {

    const [modalIsShown, setModalIsShown] = useState(false);

    const showModal = () => setModalIsShown(true);
    const hideModal = () => setModalIsShown(false);

    return (
        <>
            {modalIsShown && <CartModal onHideModal={hideModal} />}
            <Header onShowModal={showModal}/>
            <main>
                <Hero/>
                <Foods/>
            </main>
            <Footer/>
        </>
    );
}

export default App;
