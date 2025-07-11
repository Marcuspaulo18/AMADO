import { db } from "../db.js";

export const insereusuario = (req, res) => {
  try {
    const { nome, cpf, email, senha, anonimato, telefone, genero, nascimento } = req.body;
    
    const q = "CALL pdinsupusuario(?,?,?,?,?,?,?,?,?)";
    const values = [
      nome,
      cpf,
      email,
      senha,
      anonimato,
      telefone,
      genero,
      '1', 
      nascimento
    ];
    
    db.query(q, values, (err, result) => {
      if (err) {
        console.error("Error adding user:", err);
        return res.status(500).json({ error: "Error adding user to database" });
      }
      return res.status(200).json({
        success: true,
        result
      });
    });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const insereendereco = (req, res) => {
  try {
    const { cpf, cidade, rua, bairro, cep, complemento, numero } = req.body;
    
    const q = "CALL pdinsupendereco(?,?,?,?,?,?,?)"; 
    const values = [
      cpf,
      cidade,
      rua,
      bairro,
      cep,
      complemento,
      numero
    ];
    
    db.query(q, values, (err, result) => {
      if (err) {
        console.error("Error adding address:", err);
        return res.status(500).json({ error: "Error adding address to database" });
      }
      return res.status(200).json({
        success: true,
        result
      });
    });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const verifilogin = (req,res)=>{
  try {
        const { email, senha, tipo_user } = req.body;
        
        if (!email || !senha) {
            return res.status(400).json({ error: "Email e senha são obrigatórios." });
        }
        const tipoUserInt = parseInt(tipo_user);
        const q = "CALL sp_login_usuario(?,?,?)";
        const values = [email, senha, tipoUserInt]; 
        
        db.query(q, values, (err, results) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ error: "Erro interno do servidor." });
            }
            
            const data = results[0];
            
            if (!data || data.length === 0) {
                return res.status(401).json({ error: "Credenciais inválidas." });
            }

            const user = data[0];
            
            return res.status(200).json({
                message: "Login bem-sucedido",
                usuario: user,
            });
        });
    } catch (error) {
        console.error("Erro no servidor:", error);
        return res.status(500).json({ error: "Erro interno do servidor." });
    }
}

export const buscarAgendamentos = (req, res) => {
    const { idusuario } = req.params;

    const q = "CALL spdvisualizaagendamento(?)";
    db.query(q, [idusuario], (err, results) => {
        if (err) {
            console.error("Erro ao buscar agendamentos:", err);
            return res.status(500).json({ error: "Erro ao buscar agendamentos" });
        }

        const dados = results[0];
        return res.status(200).json({ agendamentos: dados });
    });
};

export const buscarProfissionaisPorTipo = (req, res) => {
  const tipo = req.params.tipo;

  const q = `
    SELECT u.nome, u.email, u.telefone,
           p.conselho, p.area_atua, p.registro,
           p.atende_online, p.atende_presencial,
           p.bio, p.tipo_atendimento
    FROM profissional p
    JOIN usuario u ON u.ideusuario = p.ideusuario
    WHERE p.tipo_atendimento = ?
  `;

  db.query(q, [tipo], (err, results) => {
    if (err) {
      console.error("Erro ao buscar profissionais:", err);
      return res.status(500).json({ error: "Erro no servidor" });
    }

    return res.status(200).json(results); // Aqui já vem como array direto
  });
};

export const buscarProfissionaisPorTipoeSubtipo = (req, res) => {
  const tipo = req.params.tipo;
  const subtipo = req.params.subtipo;

  const q = `
    SELECT
     u.nome, u.email, u.telefone,
     p.conselho, p.area_atua,
     p.atende_online, p.atende_presencial,
     p.bio, p.tipo_atendimento,p.ideprofissional,s.ideservico
    FROM profissional p
    JOIN usuario u ON u.ideusuario = p.ideusuario
    JOIN servico s on s.ideprofissional = p.ideprofissional
    WHERE p.tipo_atendimento = ?
    and s.categoria = ?
  `;

  db.query(q, [tipo,subtipo], (err, results) => {
    if (err) {
      console.error("Erro ao buscar profissionais:", err);
      return res.status(500).json({ error: "Erro no servidor" });
    }

    return res.status(200).json(results); // Aqui já vem como array direto
  });
};

export const buscarDisponibilidadePorProfissional = (req, res) => {
  const idprofissional = req.params.idprofissional;

  const q = `
    SELECT
    horainicio,
    horafim,
    diasemana,
    data_consulta 
    FROM disponibilidades
    WHERE ideprofissional=?
  `;

  db.query(q, [idprofissional], (err, results) => {
    if (err) {
      console.error("Erro ao buscar profissionais:", err);
      return res.status(500).json({ error: "Erro no servidor" });
    }

    return res.status(200).json(results); 
  });
};

export const insereagendamento = (req, res) => {
  try {
    const { ideservico,ideusuario,ideprofissional,data_agenda,local,notas,codigo } = req.body;
    
    const q = "CALL spdinsagendamento(?,?,?,?,?,?,?)";
    const values = [
      ideservico,
      ideusuario,
      ideprofissional,
      data_agenda,
      local,
      notas,
      codigo
    ];
    
    
    db.query(q, values, (err, result) => {
      if (err) {
        console.error("Error adding user:", err);
        return res.status(500).json({ error: "Error adding user to database" });
      }
      return res.status(200).json({
        success: true,
        result
      });
    });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const selavaliacoes = (req,res) => {
  try {
    const q = "CALL spdselavaliacoes()";
    db.query(q, (err, results) => {
        if (err) {
            console.error("Erro ao buscar agendamentos:", err);
            return res.status(500).json({ error: "Erro ao buscar agendamentos" });
        }

        const dados = results[0];
        return res.status(200).json({ avaliacoes: dados });
    }); 
}
catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
