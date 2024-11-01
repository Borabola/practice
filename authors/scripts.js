let authors = [
    {
        firstName: 'Andreas',
        lastName: 'Neeser'
    },
    {
        firstName: 'Anna',
        lastName: 'Ruchat'
    },
    {
        firstName: 'Arno',
        lastName: 'Camenisch'
    },
    {
        firstName: 'Barbara',
        lastName: 'Schibli'
    },
    {
        firstName: 'Demian',
        lastName: 'Leinhard'
    },
    {
        firstName: 'Flurina',
        lastName: 'Bader'
    },
    {
        firstName: 'Franco',
        lastName: 'Supino'
    },
    {
        firstName: 'Lukas',
        lastName: 'Hartmann'
    },
    {
        firstName: 'Marius',
        lastName: 'Popescu'
    },
    {
        firstName: 'Reto',
        lastName: 'Haenny'
    },
    {
        firstName: 'Sandra',
        lastName: 'Kuenzi'
    },
    {
        firstName: 'Simon',
        lastName: 'Libsig'
    }
];

const listNode = document.querySelector(".list");

const createList = (authors) => {
    listNode.innerHTML="";
    for (let i = 0; i < authors.length; i++) {
      const listItem = document.createElement("li");
      const figure = document.createElement("figure");

      const img = document.createElement("img");
      img.src = `./img/tile_${authors[i].firstName.toLowerCase()}_${authors[i].lastName.toLowerCase()}.jpg`;
      img.width = 100;
      figure.appendChild(img)

      const figurecapture = document.createElement("figurecapture");
      figurecapture.textContent = `${authors[i]?.firstName} ${authors[i].lastName}`
      figure.appendChild(figurecapture)

      listItem.appendChild(figure )
      listNode.appendChild(listItem);
    }
  };

  createList(authors);
