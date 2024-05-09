import { useAppSelector } from '../../redux/hooks';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { participant } = useAppSelector(state => state.auth);

  if (!participant) {
    return (
      <div>
        <Result
          status="403"
          title="403"
          subTitle="Vui lòng đăng nhập để làm bài test."
          extra={
            <>
              <Link to="/">
                <Button type="primary" size='large'>Back home</Button>
              </Link>
              <Link to="/auth">
                <Button type="primary" size='large'>Đăng nhập</Button>
              </Link>
            </>
          }
        />
      </div>
    );
  }
  return children;
}

export default ProtectedRoute;