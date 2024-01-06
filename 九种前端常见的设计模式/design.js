const log = (str) => {
  console.log("console.log==>", str);
};

log("hello world");

// 六大原则：高内聚低耦合
// - 高层不直接依赖底层：依赖倒置原则
// - 内部修改关闭，外部开放扩展：开闭原则
// - 聚合单一功能：单一原则
// - 低知识接口，对外接口简单：迪米特法则
// - 耦合多个接口，不如隔离拆分：接口隔离原则
// - 合并复用，子类可以代替父类：里氏代替原则

// ## 创建型
// 创建型从功能上来说是创建元素，目标是规范元素创建步骤

// ### 构造器模式：抽象了对象实例的变与不变（变的属性值，不变的是属性名）；
// ```
// 需求：公司员工创建线上基本信息
// 单个员工创建，可以直接创建
const obj = {
  name: "张三",
  age: 20,
  department: "人力资源部",
};

// 可员工的数量过于多的时候，一个个创建不可行，那么就可以使用构造器模式
class Person {
  constructor(obj) {
    this.name = obj.name;
    this.age = obj.age;
    this.department = obj.department;
  }
}

// 使用
const person1 = new Person(obj);

// ```

// ### 工厂模式：为创建一组相关或相互依赖的对象提供一个接口，且无需指定他们的具体类
// 即隐藏创建过程、暴露共同接口。
// ```

// 需求：公司员工创建完信息后需要为每一个员工创建一个信息名片
class setPerson {
  constructor(obj) {
    this.personObj = obj;
  }
  createCard() {
    // 创建信息名片
    console.log("this.personObj", this.personObj);
    return this.personObj;
  }
  otherFunction() {
    // 其他功能
  }
}

class Person1 {
  constructor(obj) {
    return new setPerson(obj);
  }
}

const person2 = new Person1({
  name: "张三",
  age: 20,
  department: "人力资源部",
});
const card = person2.createCard();
log(card);

// ```

const clear = () => console.clear();

clear();

// ### 单例模式：全局只有一个实例，避免重复创建对象，优化性能
// ```
// 需求：判断一款应用的开闭状态，根据不同状态给出不同提示
class applicationStation {
  constructor() {
    this.state = "off";
  }
  play() {
    if (this.state == "on") {
      console.log("已打开");
      return;
    }
    this.state = "on";
  }
  shutdown() {
    if (this.state == "off") {
      console.log("已关闭");
      return;
    }
    this.state = "off";
  }
}
var appStation = new applicationStation();

// application1 和 application2 拥有同一个applicationStation对象;
const application1 = appStation;
const application2 = appStation;

// 只要一个改变，其他都会改变
application1.play();
// application2.shutdown();

const application3 = appStation;

console.log("application1.state", application1.state);
console.log("application2.state", application2.state);
console.log("application3.state", application3.state);

// ```

clear();

// ## 结构型
// 结构型从功能上来说就是给元素添加行为的，目标是优化结构的实现方式
//  ### 适配器模式：适配独立模块，保证模块间的解耦且连接兼容
// ```

// 需求：一个港行PS，需要适配插座国标
class HKDevice {
  getPlug() {
    return "港行双圆柱插头";
  }
}

class Target {
  constructor() {
    this.plug = new HKDevice();
  }
  getPlug() {
    return this.plug.getPlug() + "+港行双圆柱转换器";
  }
}

const target = new Target();
console.log("target.getPlug()", target.getPlug());

// ```

clear();

// ### 装饰器模式：动态将责任附加到对象之上
// ```
//  装饰器模式可以用于动态地给对象添加新的功能或职责，而不需要修改其源代码

// 原始类
class Person2 {
  constructor(name, seniorityNum) {
    this.name = name;
    this.seniorityNum = seniorityNum;
  }
  createCard() {
    console.log(`Name:${this.name},Seniority Number:${this.seniorityNum}`);
  }
}

// 装饰器函数
// 等价于 class updateDecorator extends Person2
function updateDecorator(person) {
  return class extends person {
    constructor(name, seniorityNum) {
      super(name, seniorityNum);
    }
    createCard() {
      super.createCard();
      if (this.seniorityNum < 1) {
        this.update();
      }
    }
    update() {
      console.log(`Updating ${this.name}s information`);
    }
  };
}

// 使用装饰器
const DecoratedPerson = updateDecorator(Person2);

// 创建对象并使用
const person3 = new DecoratedPerson("Alice", 0);

person3.createCard();

const person4 = new DecoratedPerson("Bob", 2);

person4.createCard();

// ```
// 首先定义了一个原始类 `Person`，然后创建了一个装饰器函数 `updateDecorator`，该函数接受一个 `person`类并返回一个新的类，该类继承自原始 person 类，但添加了额外的功能（在 `createCard` 方法中的更新检查）。最后，使用装饰器来创建对象并使用它们

clear();

// ### 代理模式：使用代理人来代替原始对象处理更专业的事情
// ```

// 原始的应用状态类
class ApplicationStation {
  init() {
    return "Hello";
  }
}

// 用户类，包含登录状态
class User {
  constructor(loginStatus) {
    this.loginStatus = loginStatus;
  }
}

// 应用状态代理
class ApplicationStationProxy {
  constructor(user) {
    this.user = user;
    this.applicationStation = new ApplicationStation();
  }
  init() {
    if (this.user.loginStatus) {
      return this.applicationStation.init();
    } else {
      return "Please login";
    }
  }
}

// 创建用户对象和代理对象
const user = new User(true);
const userProxy = new ApplicationStationProxy(user);

// 初始化应用状态
const result = userProxy.init();
console.log("result:", result);

// ```

// 我们有三个类：`ApplicationStation` 代表应用状态，`User` 代表用户，`ApplicationStationProxy` 代表应用状态的代理。

// 代理类 `ApplicationStationProxy` 接受一个用户对象作为参数，并在 `init` 方法中检查用户的登录状态。如果用户已登录，它会初始化应用状态；否则，它会返回一条消息要求用户登录。

// 这样，我们就使用代理模式实现了对应用状态的访问控制，确保应用只在登录状态下才能初始化。

clear();

// ## 行为型
// 不同对象之间责任的划分和算法的抽象化

// ### 观察者模式：当一个属性发生变化时，观察者会连续引发所有的相关状态变更
// 观察者模式常用于实现对象之间的一对多依赖关系，其中一个对象（称为主题或可观察对象）维护一组依赖对象（称为观察者），当主题的状态发生变化时，通知所有观察者。

// ```

// 定义主题（智能家居中心）
class MediaCenter {
  constructor() {
    this.state = "";
    this.observers = [];
  }

  // 注册观察者
  attach(observer) {
    this.observers.push(observer);
  }

  // 获取当前状态
  getState() {
    return this.state;
  }

  // 设置状态并通知所有观察者
  setState(state) {
    this.state = state;
    this.notifyAllObservers();
  }

  // 通知所有观察者
  notifyAllObservers() {
    this.observers.forEach((observer) => {
      observer.update();
    });
  }
}

// 定义观察者
class Observer {
  constructor(name, center) {
    this.name = name;
    this.center = center;
    this.center.attach(this); // 注册自己到主题
  }

  // 当主题状态发生变化时，更新观察者
  update() {
    const newState = this.center.getState();
    console.log(`${this.name} 收到状态更新，新状态是:${newState}`);
  }
}

// 创建智慧家居中心和观察者
const center = new MediaCenter();
const observer1 = new Observer("Observer 1", center);
const observer2 = new Observer("Observer 2", center);

// 模拟状态变化
center.setState("打开电视");
center.setState("关闭音响");

// ```

// `MediaCenter` 充当主题，维护了一个状态和一组观察者。`Observer` 是观察者类，它可以注册到主题并在主题状态发生变化时接收更新。通过 `center.setState` 来改变主题状态，所有注册的观察者将收到通知并更新。

clear();

// ### 模板模式:在模板中，定义好每个方法的执行步骤，方法本身关注于自己的事情
// 定义了一个算法的骨架，并允许子类在不改变算法结构的情况下重写算法的特定步骤
class EntryPathTemplate {
  constructor() {
    // 模板方法，定义了整个流程的骨架
    this.personEntry = function () {
      this.init();
      this.createCard();
      this.inductionTraining();
      this.trainingExamination();
    };
  }
  init() {
    // 初始化员工信息
    console.log("初始化员工信息");
  }
  createCard() {
    // 创建员工名片
    console.log("创建员工名片");
  }
  inductionTraining() {
    // 入职培训
    console.log("入职培训");
  }
  trainingExamination() {
    // 培训后测试
    console.log("培训后测试");
  }
}

// 具体的入职流程类
class ConcreteEntryPath extends EntryPathTemplate {
  constructor(obj) {
    super();
  }
  // 可选：覆盖父类的特定步骤
  inductionTraining() {
    super.inductionTraining(); // 调用父类的方法
    console.log("特定的入职培训内容"); // 添加特定的内容
  }
}

// 使用实例
const entryPath = new ConcreteEntryPath();
entryPath.personEntry();
// `EntryPathTemplate` 是模板类，定义了入职流程的骨架，包括 `init`、`creatCard`、`inductionTraining`、`trainingExamination` 四个步骤。`ConcreteEntryPath` 是具体的入职流程类，继承自模板类，并可以选择性地覆盖或扩展其中的特定步骤。在示例中，`inductionTraining` 被覆盖以添加特定的培训内容。

// 通过这种方式，你可以保持整个流程的一致性，同时允许每个具体的流程类定制或扩展特定的步骤。

clear();

// ### 命令模式:请求以指令的形式包裹在对象中，并传给调用对象
// 将请求封装成一个对象，从而允许使用不同的请求、队列或者日志来参数化其他对象

// > 场景描述：     假设有一个电视遥控器，用户可以通过遥控器执行开、关、音量调节等操作。使用命令模式实现这个功能。

// 定义接收者：
// 电视类，接收者
class Television {
  turnOn() {
    console.log("电视打开");
  }
  turnOff() {
    console.log("电视关闭");
  }
  adjustVolume(volume) {
    console.log(`调节音量到${volume}`);
  }
}
// 定义命令接口：
// 命令接口
class Command {
  execute() {
    throw new Error("This method must be overridden!");
  }
}

// 实现具体命令：

// 开电视的具体命令
class TurnOnCommand extends Command {
  constructor(Television) {
    super();
    this.television = television;
  }
  execute() {
    this.television.turnOn();
  }
}
// 关闭电视的具体命令
class TurnOffCommand extends Command {
  constructor(television) {
    super();
    this.television = television;
  }
  execute() {
    this.television.turnOff();
  }
}
// 调剂音量的具体命令
class AdjustVolumeCommand extends Command {
  constructor(television, volume) {
    super();
    this.television = television;
    this.volume = volume;
  }
  execute() {
    this.television.adjustVolume(this.volume);
  }
}

// 创建遥控器：

// 遥控器，调用者
class RemoteControl {
  constructor() {
    this.command = null;
  }
  //   设置命令
  setCommand(command) {
    this.command = command;
  }
  //   执行命令
  pressButton() {
    this.command.execute();
  }
}

// 使用示例
const television = new Television();

const turnOnCommand = new TurnOnCommand(television);
const turnOffCommand = new TurnOffCommand(television);
const adjustVolumeCommand = new AdjustVolumeCommand(television, 20);

const remote = new RemoteControl();

remote.setCommand(turnOnCommand);
remote.pressButton();

remote.setCommand(adjustVolumeCommand);
remote.pressButton();

remote.setCommand(turnOffCommand);
remote.pressButton();

// 解释:
// 通过命令模式，我们实现了将命令封装成对象，从而实现了遥控器的控制功能。这种设计的优势在于：
// 1.解耦：遥控器和电视之间的关系被解耦，遥控器不需要知道电视的具体实现，只需要知道如何调用命令对象。

// 2.可扩展性：容易添加新的命令，比如调节亮度、切换频道等，而无需修改遥控器或电视的代码。

// 3.撤销操作：可以轻松实现撤销操作，即将上一次执行的命令保存起来，需要时执行反向操作。

// 4.队列执行：可以将一系列命令存储在队列中，按顺序执行，实现队列化的操作。

// 5.日志记录：可以记录每个命令的执行日志，用于调试或记录用户操作。
