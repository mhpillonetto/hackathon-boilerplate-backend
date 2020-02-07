import 'dotenv/config'
import express from 'express';
import cors from 'cors';

import routes from './routes';
import models, { connectDb } from './models';

//Cria a aplicacao e bota pra rodar
const app = express();
app.use(cors());
app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
);

//configurcao de rotas, middlewares...
app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/messages', routes.message);

//conexao com o banco de dados

//deixar como true se quiser q limpe o banco antes de rodar:
const eraseDatabaseOnSync = true;

connectDb().then(async () => {
    if (eraseDatabaseOnSync) {
        await Promise.all([
          models.User.deleteMany({}),
          models.Message.deleteMany({}),
        ]);

        createUsersWithMessages();
    }

    app.listen(process.env.PORT, () =>
      console.log(`Example app listening on port ${process.env.PORT}!`),
    );
  });

//faz o seed do banco
const createUsersWithMessages = async () => {
    const user1 = new models.User({
      username: 'xisclayson',
    });
    const user2 = new models.User({
      username: 'thundervrau',
    });
    const message1 = new models.Message({
      text: 'bom dia',
      user: user1.id,
    });
    const message2 = new models.Message({
      text: 'esse é um template',
      user: user2.id,
    });
    const message3 = new models.Message({
      text: 'de express com mongo',
      user: user2.id,
    });
    await message1.save();
    await message2.save();
    await message3.save();
    await user1.save();
    await user2.save();
  };