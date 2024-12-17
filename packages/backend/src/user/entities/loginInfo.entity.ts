import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class LoginInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ip: string;

  @CreateDateColumn({
    comment: '创建时间',
  })
  createTime: Date;

  @Column({
    comment: '次数',
    default: 0,
  })
  times: number;

  @Column({
    type: 'text',
    comment: '登录设备信息',
  })
  userAgent: string;

  @ManyToOne(() => User, {})
  user: User;
}
