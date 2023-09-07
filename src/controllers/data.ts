import { Data } from "../model/Data";
import { File } from "../model/File";
import { User } from "../model/User";

export const data = async (req: any, res: any, next: any) => {
  try {
    const info = req.body.info;
    const files = req.body.files;
    const skills = req.body.skills;

    const fileIds: string[] = [];

    let avatar = new File({
      name: files.avatar.name,
      src: files.avatar.src,
      user: req.userId,
    });

    avatar = await avatar.save();

    if (files.file1) {
      let file1 = new File({
        name: files.file1.name,
        src: files.file1.src,
        user: req.userId,
      });
      file1 = await file1.save();
      fileIds.push(file1._id.toString());
    }

    if (files.file2) {
      let file2 = new File({
        name: files.file2.name,
        src: files.file2.src,
        user: req.userId,
      });
      file2 = await file2.save();
      fileIds.push(file2._id.toString());
    }

    const skillsExtract: string[] = [];

    skills.skills.forEach((skill: any) => {
      skillsExtract.push(skill.name);
    });

    const user = await User.findById(req.userId);
    const data = new Data({
      username: info.username,
      about: info.about,
      firstName: info.firstName,
      lastName: info.lastName,
      email: info.email,
      phone: info.phone,
      city: info.city,
      country: info.country,
      address1: info.address1,
      address2: info.address2,
      pin: info.pin,
      state: info.state,
      avatar: avatar._id,
      files: fileIds,
      skills: skillsExtract,
      userId: req.userId,
      geolocation: skills.geolocation,
    });

    await data.save();

    res.status(201).json({
      message: "File uploaded successfully",
    });
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const getData = async (req: any, res: any, next: any) => {
  try {
    const data = await Data.find({ userId: req.userId }).populate("avatar");
    res.status(200).json({
      data: data,
    });
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
