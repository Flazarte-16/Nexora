import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useLocation } from "wouter";
import "./ModalUpdateUser.css";

export const ModalUpdateUser = ({
  modalClassName,
  userInfo,
  setUserInfo,
  setModalIsOpen,
}) => {
  const [imageUrlPreview, setImageUrlPreview] = useState("");
  const [bannerUrlPreview, setBannerUrlPreview] = useState("");
  const [updateUserValues, setUpdateUserValues] = useState({
    username: "",
    full_name: "",
    description: "",
    profile_image: null,
    banner_image: null,
  });
  const { user, setUser } = useAuth();
  const [_, navigate] = useLocation();

  const handleUpdateUser = async () => {
    try {
      const formData = new FormData();
      formData.append("username", updateUserValues.username);
      formData.append("full_name", updateUserValues.full_name);
      formData.append("description", updateUserValues.description);
      formData.append("image_url", updateUserValues.profile_image);
      formData.append("banner_image_url", updateUserValues.banner_image);

      const response = await fetch("http://localhost:3000/v1/users/", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const data = await response.json();

      setUserInfo({ ...userInfo, ...data.updatedsInputs });

      const updatedUser = {
        ...userInfo,
        ...data.updatedsInputs,
      };

      setUser({ ...user, ...updatedUser });

      if (updatedUser.username) {
        navigate(`/${updatedUser.username}`);
      }

      localStorage.setItem("token", data.newToken);

      setUpdateUserValues({
        username: "",
        full_name: "",
        description: "",
        profile_image: null,
        banner_image: null,
      });
      setImageUrlPreview("");
      setBannerUrlPreview("");
      setModalIsOpen(false);
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleInputValues = (e) => {
    setUpdateUserValues({
      ...updateUserValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUrlPreview = (e) => {
    const file = e.target.files[0];

    if (!file.type.startsWith("image/")) {
      sileo.error({
        title: "Please upload an image file.",
        duration: 1000,
        fill: "#000000",
      });
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    e.target.name === "banner_image"
      ? setBannerUrlPreview(imageUrl)
      : setImageUrlPreview(imageUrl);

    setUpdateUserValues({ ...updateUserValues, [e.target.name]: file });
  };

  const handleModalOpen = () => {
    setUpdateUserValues({
      username: "",
      full_name: "",
      description: "",
      profile_image: null,
      banner_image: null,
    });
    setImageUrlPreview("");
    setBannerUrlPreview("");
    setModalIsOpen(false);
  };

  return (
    <section className={`modal modal--edit ${modalClassName}`}>
      <section className="modal-header">
        <button className="btn-modal close" onClick={handleModalOpen}>
          <ion-icon name="close-outline"></ion-icon>
        </button>
        <h2 className="title l">Edit profile</h2>
        <button className="btn-modal save" onClick={handleUpdateUser}>
          Save
        </button>
      </section>
      <section className="image-profile-container">
        <section
          className={`banner image-modal ${!bannerUrlPreview && "image_active"}`}
          style={{
            backgroundImage: `url(${bannerUrlPreview ? bannerUrlPreview : userInfo?.banner_image_url})`,
          }}
        >
          {!bannerUrlPreview && (
            <>
              <input
                type="file"
                onChange={handleImageUrlPreview}
                name="banner_image"
                id="banner_image_url_modal"
                className="image_url_modal"
              />
              <label
                className="btn-update-image"
                htmlFor="banner_image_url_modal"
              >
                <ion-icon name="camera-reverse-outline"></ion-icon>
              </label>
            </>
          )}
        </section>
      </section>
      <section className="input-container-modal">
        {imageUrlPreview ? (
          <img
            src={imageUrlPreview}
            alt="Foto de perfil"
            className="user-img modal-img"
          />
        ) : (
          <section className="user-img-container">
            <img
              src={userInfo?.image_url}
              alt="Foto de perfil"
              className="user-img modal-img"
            />
            <input
              type="file"
              id="image_url_modal"
              name="profile_image"
              className="image_url_modal"
              onChange={handleImageUrlPreview}
            />
            <label className="btn-update-image" htmlFor="image_url_modal">
              <ion-icon name="camera-reverse-outline"></ion-icon>
            </label>
          </section>
        )}

        <input
          onChange={handleInputValues}
          type="text"
          placeholder={userInfo.full_name}
          name="full_name"
          value={updateUserValues.full_name}
        />
        <input
          onChange={handleInputValues}
          type="text"
          placeholder={`@${userInfo.username}`}
          name="username"
          value={updateUserValues.username}
        />
        <textarea
          onChange={handleInputValues}
          name="description"
          placeholder={userInfo.description || "Description"}
          value={updateUserValues.description}
        ></textarea>
      </section>
    </section>
  );
};
