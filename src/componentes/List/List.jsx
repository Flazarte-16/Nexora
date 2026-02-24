import { useState } from "react";
import { PostCard } from "../PostCard/PostCard";
import "./List.css";

export const List = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      profileImage:
        "https://codigoespagueti.com/wp-content/uploads/2020/12/Broly.jpg",
      name: "Jhon Doe",
      username: "jdoe",
      content:
        "Hoy arranqué un nuevo proyecto en React. Se viene algo grande 🚀",
    },
    {
      id: 2,
      profileImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9eUa4xVdaK2005rQjLH_O7pGuOn1tCjw_CA&s",
      name: "Elena Martínez",
      username: "elenaux",
      content:
        "El diseño no es solo cómo se ve, sino cómo funciona. UX > todo.",
    },
    {
      id: 3,
      profileImage:
        "https://media.licdn.com/dms/image/v2/D4E03AQHIVoyTfk_D3Q/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1675798826130?e=2147483647&v=beta&t=FgtBPlKUCt7vQmpgIFoLh31YqfRRdHxucMxvNcy4B4A",
      name: "Lucas Fernández",
      username: "lucasdev",
      content:
        "Probando nuevas animaciones con CSS y la verdad quedan facherísimas ✨",
    },
    {
      id: 4,
      profileImage: "JhonDoe.png",
      name: "Sofía Ramírez",
      username: "sofiacode",
      content: "Nada como cerrar bugs un viernes a la noche 😌💻",
    },
    {
      id: 5,
      profileImage:
        "https://media.licdn.com/dms/image/v2/D4D03AQFVhpA9Yxu8Og/profile-displayphoto-shrink_100_100/B4DZUj6bGcGkAU-/0/1740064273451?e=1773273600&v=beta&t=5hyUnpPAaSTaZUbN3LiReXz8q5EIv7LfsixbxB-xE90",
      name: "Constantino Pasquali",
      username: "cpasquali",
      content:
        "Full stack mode activado. Backend listo, ahora toca el frontend 🔥",
    },
    {
      id: 6,
      profileImage:
        "https://media.licdn.com/dms/image/v2/D4D03AQFVhpA9Yxu8Og/profile-displayphoto-shrink_100_100/B4DZUj6bGcGkAU-/0/1740064273451?e=1773273600&v=beta&t=5hyUnpPAaSTaZUbN3LiReXz8q5EIv7LfsixbxB-xE90",
      name: "Constantino Pasquali",
      username: "cpasquali",
      content:
        "A veces siento que programar es como intentar armar un rompecabezas infinito donde cada pieza nueva que encaja mágicamente rompe tres que ya estaban funcionando. Arrancás el día diciendo 'hoy lo termino en dos horas' y de repente son las 3 de la mañana, estás debuggeando algo que era un punto y coma, el café ya no hace efecto y te preguntás por qué elegiste esta profesión. Pero después, cuando todo finalmente compila, el deploy sale bien y la app funciona exactamente como la imaginaste… esa sensación no te la da nada. Es caos, frustración, aprendizaje constante y una satisfacción absurda todo mezclado. Y sí, mañana lo volvería a hacer.",
    },
  ]);

  return (
    <section className="list">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </section>
  );
};
