import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { UserCertificate } from '../../users/entities/userCertificate.entity';


@Entity('certificate_types')
export class CertificateType {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id!: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  key!: string;

  @Column({ type: 'varchar', length: 100 })
  title!: string; 

  @Column({ type: 'varchar', length: 50, name: 'icon_key' })
  iconKey!: string; 

  @Column({ type: 'varchar', length: 50, nullable: true })
  color!: string;

  @Column({ type: 'boolean', default: true, name: 'is_active' })
  isActive!: boolean; 
  @OneToMany(
    () => UserCertificate,
    (userCertificate) => userCertificate.certificateType,
  )
  userCertificates!: UserCertificate[];
}