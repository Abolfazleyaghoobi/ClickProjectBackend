import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
;


import { User } from './users.entity';
import { CertificateType } from '../../certificateType/entity/certificateType.entity';

@Entity('user_certificates')
export class UserCertificate {

  @PrimaryColumn({ type: 'bigint', unsigned: true, name: 'user_id' })
  @Index('idx_user_certificates_user_id')
  userId!: string;


  @PrimaryColumn({ type: 'bigint', unsigned: true, name: 'certificate_type_id' })
  @Index('idx_user_certificates_certificate_type_id')
  certificateTypeId!: string;

  @CreateDateColumn({ type: 'timestamp', name: 'awarded_at' })
  awardedAt!: Date; 

  @Column({ type: 'varchar', length: 50, default: 'path_completion' })
  source!: string; 

  @Column({ type: 'bigint', unsigned: true, nullable: true, name: 'source_ref_id' })
  sourceRefId!: string; 


  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;


  @ManyToOne(() => CertificateType, (certType) => certType.userCertificates, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'certificate_type_id' })
  certificateType!: CertificateType;
}