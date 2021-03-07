const dotenv = require('dotenv');
const colors = require('colors');

const users = require('./data/users.js');
const items = require('./data/items.js');

const User = require('./models/user.model.js');
const Item = require('./models/item.model.js');
const Order = require('./models/order.model.js');

const connectDB = require('./config/db.js');

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Item.deleteMany();
    await User.deleteMany();

    const createdUser = await User.insertMany(users);
    const adminUser = createdUser[0]._id;

    const sampleItems = items.map((item) => {
      return { ...item, user: adminUser };
    });
    await Item.insertMany(sampleItems);

    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(`${err}`.red.inverse);
    process.exit(1);
  }
};

//Delete data

const deleteData = async () => {
  try {
    await Order.deleteMany();
    await Item.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(`${err}.red.inverse`);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}

// to import the data node seeder -i
// to delete all the data node seeder -d
