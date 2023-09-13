import React, { useEffect, useState } from 'react'
import './navbar.css'
import Notification from '../../img/notification.svg'
import Message from '../../img/message.svg'
import Settings from '../../img/settings.svg'


const Navbar = ({ socket }) => {

    const [notifications, setNotifications] = useState([])
    const [open, setOpen] = useState(false);

    useEffect(() => {
        socket.on("getText", data => {
            setNotifications((prev) => [...prev, data])
        })
    }, [socket])

    // console.log(notifications);

    const displayNotification = ({ senderName, text }) => {
        let action;

        // if (type === 1) {
        //     action = "liked"
        // } else if (type === 2) {
        //     action = "commented"

        // }
        // else {
        //     action = "shared"
        // }



        return (
            <span className='notification' > {`${senderName} ${text} your post`} </span>
        )
    }

    const handleRead = () => {

        setNotifications([])
        setOpen(false)
    }


    return (
        <>
            <div className="navbar">
                <span className='logo'>Kelebek App</span>
                <div className="icons">
                    <div className="icon" onClick={() => setOpen(!open)}>
                        <img src={Notification} className='iconImg' alt="" />

                        {notifications.length > 0 &&
                            <div className="counter"> {notifications.length} </div>

                        }

                    </div>
                    <div className="icon" onClick={() => setOpen(!open)}>
                        <img src={Message} className='iconImg' alt="" />
                        {/* <div className="counter">2</div> */}
                    </div>
                    <div className="icon">
                        <img src={Settings} className='iconImg' alt="" />
                        {/* <div className="counter">2</div> */}
                    </div>
                </div>

                {open && (




                    <div className="notifications">
                        {notifications.map((n) => (
                            <li key={Math.random()}>
                                {displayNotification(n)}

                            </li>
                        ))}
                        <button className='nButton' onClick={handleRead} >Mark as red </button>
                    </div>
                )}
            </div>
        </>

    )
}

export default Navbar