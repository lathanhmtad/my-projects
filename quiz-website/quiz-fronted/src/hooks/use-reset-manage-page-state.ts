import { useAppDispatch } from '../redux/hooks';
import { useEffect } from 'react';
import { resetManagePageState } from '../redux/slices/managePageSlice';

function useResetManagePageState() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(resetManagePageState())
  }, [resetManagePageState])
}

export default useResetManagePageState