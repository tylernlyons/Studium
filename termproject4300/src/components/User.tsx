import Image from 'next/image';
import styles from './User.module.css';
import Card from './Card';


export interface User {
  id: number;
  name: string;
  username: string;
  imageUrl: string;
  email: string;
  password: string;
}

export interface UserProps {
  user: User;
}

export default function User({ user }: UserProps) {
  return (
    <Card>
      <Image
        className={styles.userImg}
        src={user.imageUrl}
        alt={`${user.name}'s profile picture`}
        width={100}
        height={100}
        priority
      />
      <div className={styles.userInfo}>
        <h2>Name: {user.name}</h2>
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
      </div>
    </Card>
  );
}
