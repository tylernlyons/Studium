import User, { User as UserType } from './User';

interface UsersProps {
    prop: UserType[];
}

const Users = ({ prop }: UsersProps) => {
    return (
        <div>
            {prop.map((user) => (
                <User key={user.id} user={user} />
            ))}
        </div>
    );
}

export default Users;
