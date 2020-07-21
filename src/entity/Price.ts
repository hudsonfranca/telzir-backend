import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    Column,
    BeforeInsert,
    BeforeUpdate,
} from 'typeorm';
import DDD from './DDD';

@Entity()
export default class Price {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => DDD, ddd => ddd.DddDestination, {
        onDelete: 'CASCADE',
        nullable: false,
    })
    public destination!: DDD;

    @ManyToOne(type => DDD, ddd => ddd.DddSource, {
        onDelete: 'CASCADE',
        nullable: false,
    })
    public source!: DDD;

    @Column()
    price: number;

    @BeforeInsert()
    setPrice(): void {
        this.price = Math.round(this.price * 100);
    }

    @BeforeUpdate()
    updatePrice(): void {
        this.price = Math.round(this.price * 100);
    }

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
