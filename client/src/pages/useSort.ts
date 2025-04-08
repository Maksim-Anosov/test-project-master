import { useMemo, useState } from 'react';

function useSort<T extends { id: number }>(items: T[]): [T[], string, () => void] {
	const [sortBy, setSortBy] = useState<'ASC' | 'DESC'>('ASC');
	
	const sortedItems = useMemo(() => {
			// Создаём копию массива, чтобы не мутировать исходный
			const itemsCopy = [...items];
			
			if (sortBy === 'ASC') {
					return itemsCopy.sort((a, b) => a.id - b.id);
			} else {
					return itemsCopy.sort((a, b) => b.id - a.id);
			}
	}, [items, sortBy]);
	
	const handleSortClick = () => {
			setSortBy(prev => prev === 'ASC' ? 'DESC' : 'ASC');
	}
	
	return [sortedItems, sortBy, handleSortClick];
}

export default useSort;
