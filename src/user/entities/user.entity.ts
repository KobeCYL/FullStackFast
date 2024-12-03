import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LoginInfo } from './loginInfo.entity';
import { DataOption } from 'src/dictionary/entities/dataOption.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({
    length: 50,
    comment: '用户密码',
    default: '123456',
  })
  password: string;

  @CreateDateColumn({
    comment: '创建时间',
  })
  createTime: Date;

  @UpdateDateColumn({
    comment: '更新时间',
  })
  updateTime: Date;

  @Column({
    comment: '是否为管理员',
  })
  isAdmin: boolean;

  @Column({
    comment: 'fastgpt url',
  })
  url: string;

  @Column({
    default: 'math',
  })
  teacherType: string;

  @OneToMany(() => LoginInfo, (loginInfo) => loginInfo.user, {
    cascade: true,
  })
  loginInfo: LoginInfo[];
}
