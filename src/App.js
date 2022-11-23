import { useState } from "react";
import useFetch from "use-http";
import "./styles.css";

const baseURL = `https://mack-webmobile.vercel.app/api`;
export default function App() {
  const { get, response, loading, error, post, del } = useFetch(baseURL);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [form1, setForm1] = useState(0);
  const [nameV, setNameV] = useState();
  const [SobreNameV, setSobreNameV] = useState();
  const [emailV, setEmailV] = useState();
  const [salarioV, setSalarioV] = useState();
  const [dataV, setDataV] = useState();
  const [AvatarV, setAvatarV] = useState();
  const [ativoV, setAtivoV] = useState();
  const [search, setSearch] = useState("");
  const buscarUsuarios = async () => {
    const data = await get("/users");
    if (response.ok) {
      setUsers(data);
    } else {
      setUsers([]);
    }
  };

  const postaV = async () => {
    const postaV = {
      name: nameV + SobreNameV,
      email: emailV,
      avatar: AvatarV,
      date: dataV,
      salary: salarioV,
      status: ativoV
    };

    const resp = await post("/users", postaV);
    console.log(resp);
    if (response.ok) {
      buscarUsuarios();
    }
  };

  const apagar = async (post) => {
    await del("/users/" + post._id);
    if (response.ok) {
    }
  };

  if (error) return `Erro: ${error.message}`;
  if (loading) return "Carregando";

  const FormStat = async () => {
    setForm1(1);
    form1 === 1 ? setForm1(0) : setForm1(1);
  };

  return (
    <>
      <div className="Botao">
        <button className="butao" onClick={() => buscarUsuarios()}>
          <img id="lupa" src="imagemLupa.png"></img>{" "}
          <h2 id="textLupa">Buscar Empregados</h2>
        </button>
        <br />

        <button className="topright" onClick={() => FormStat()}>
          {" "}
          <img id="add" src="addUser.png"></img>
          <h2 id="textLupa">Adicionar Empregados</h2>
        </button>

        <form className={form1 === 0 ? "formularioOff" : "formulario"}>
          <br />
          <input
            type="text"
            className="dadosFormulario"
            id="imgAvatar"
            value={AvatarV}
            onChange={(v) => {
              setAvatarV(v.target.value);
            }}
            placeholder="Imagem do seu avatar"
          />{" "}
          <br />
          <br />
          <input
            type="text"
            className="dadosFormulario"
            name="Nome"
            value={nameV}
            onChange={(v) => {
              setNameV(v.target.value);
            }}
            placeholder="Nome"
          />{" "}
          <br /> <br />
          <input
            type="text"
            className="dadosFormulario"
            id="sobrenome"
            value={SobreNameV}
            onChange={(v) => {
              setSobreNameV(v.target.value);
            }}
            placeholder="Sobrenome"
          />
          <br /> <br />
          <input
            type="email"
            className="dadosFormulario"
            id="email"
            value={emailV}
            onChange={(v) => {
              setEmailV(v.target.value);
            }}
            placeholder="E-mail"
          />{" "}
          <br />
          <br />
          <input
            type="text"
            className="dadosFormulario"
            id="salario"
            value={salarioV}
            onChange={(v) => {
              setSalarioV(v.target.value);
            }}
            placeholder="Salário"
          />{" "}
          <br />
          <br />
          <input
            type="date"
            className="dadosFormulario"
            value={dataV}
            onChange={(v) => {
              setDataV(v.target.value);
            }}
          />
          <br />
          <br />
          <label className="busca" id="txtAT">
            {" "}
            ativo:
          </label>
          <input
            type="checkbox"
            className="dadosFormulario"
            value={ativoV}
            onChange={() => {
              setAtivoV("Active");
            }}
          />{" "}
          <br /> <br />
          <label className="busca" id="txtIN">
            {" "}
            inativo:
          </label>
          <input
            type="checkbox"
            className="dadosFormulario"
            value={ativoV}
            onChange={(v) => {
              setAtivoV("Inactive");
            }}
          />
          <br />
          <div className="botoes">
            <button id="adicionar" onClick={postaV}>
              Adicionar
            </button>
          </div>
        </form>
        <form>
          <input
            type="text"
            className="FILTRO"
            placeholder="Busque um nome"
            value={search}
            onChange={(c) => setSearch(c.target.value)}
          ></input>
        </form>

        <div className="geral">
          {users
            .filter((u) => {
              return search === "" ? u : u.name.includes(search);
            })
            .map((u) => {
              return (
                <div className="user">
                  <div className="dados" id="name">
                    {u.name}
                  </div>
                  <img src={u.avatar} className="dados" id="avatar"></img>
                  <div className="dados" id="email">
                    Email:{u.email}
                  </div>
                  <div className="dados" id="salary">
                    Salary:{u.salary}
                  </div>
                  <div className="dados" id="date">
                    Birthday:{u.date}
                  </div>
                  <div className="dados" id="status">
                    Status:{u.status}
                  </div>{" "}
                  <button
                    id="apagar"
                    onClick={() => {
                      apagar(u);
                    }}
                  >
                    Apagar
                  </button>
                </div>
              );
            })}
        </div>
      </div>

      {selectedUser && <h1>Posts de {selectedUser.name}</h1>}

      {posts.map((p) => {
        return (
          <>
            <article>
              <header>{p.title}</header>
              <main>{p.body}</main>
            </article>
          </>
        );
      })}
    </>
  );
}
