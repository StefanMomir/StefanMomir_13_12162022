import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { editProfile } from "../redux/profile";
import { getProfile } from "../redux/profile.js";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.profiles);
  useEffect(() => {
    dispatch(getProfile());
  }, []);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
  });
  const [editOn, setEditOn] = useState(false);

  const firstName = useRef();
  const lastName = useRef();

  const handleForm = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!formData.firstName) formData.firstName = firstName.current?.value;
    if (!formData.lastName) formData.lastName = lastName.current?.value;
    const userData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
    };
    dispatch(editProfile(userData));
  };

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {profile && profile.firstName + " " + profile.lastName}
        </h1>
        {editOn === false && (
          <button
            className="edit-button"
            onClick={(e) => {
              setEditOn(true);
            }}
          >
            Edit Name
          </button>
        )}
        {editOn === true && (
          <button
            className="edit-button"
            onClick={(e) => {
              setEditOn(false);
            }}
          >
            CANCEL
          </button>
        )}

        <div className="dropdown-form">
          <form
            className={
              ("profile-edit", editOn ? "profile-edit On" : "profile-edit")
            }
            onSubmit={handleEdit}
          >
            <label htmlFor="firstName"></label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              defaultValue={profile?.firstName}
              ref={firstName}
              onChange={handleForm}
            />
            <label htmlFor="lastName"></label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              defaultValue={profile?.lastName}
              ref={lastName}
              onChange={handleForm}
            />
            <label htmlFor="submit"></label>
            <button className="edit-button" type="submit" id="submit">
              Save
            </button>
          </form>
        </div>
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
