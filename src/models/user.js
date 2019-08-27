import bcyrpt from 'bcrypt';

const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 42],
      },
    },
    role: {
      type: DataTypes.STRING,
    },
  }, {
    timestamps: false,
  });

  User.associate = (models) => {
    User.hasMany(models.Message, { onDelete: 'CASCADE' });
  };

  User.getPk = async (user) => user.i_user;

  User.findByLogin = async (login) => {
    let user = await User.findOne({
      where: { username: login },
    });

    if (!user) {
      user = await User.findOne({
        where: { email: login },
      });
    }

    return user;
  };


  User.beforeCreate(async (user) => {
    user.password = await user.generatePasswordHash();
  });

  User.prototype.generatePasswordHash = async function () {
    const saltRounds = 10;

    return await bcyrpt.hash(this.password, saltRounds);
  };

  User.prototype.validatePassword = async function (password) {
    return await bcyrpt.compare(password, this.password);
  };

  return User;
};

export default user;
