import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TypoText from '../../components/MUIComponent/TypoText';

function CountCard({ countCardKey }) {

    const [parameter, setParameter] = useState(1);
    const [count, setCount] = useState(0);
    const [title, setTitle] = useState([]);
    function getRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    const randomColor = getRandomColor();

    useEffect(() => {
        fetchData(parameter); // Gọi API khi giá trị tham số thay đổi
    }, [countCardKey]);

    async function fetchData(parameter) {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/note/kanban/data?boardId=${parameter}`, { method: "GET" });
            const data = await response.json();
            // console.log(data); // Xử lý dữ liệu API ở đây
            let totalCount = 0;
            Object.values(data).forEach(item => {
                totalCount += item.items.length;
            });
            const titles = Object.values(data).map(item =>
            ({
                title: item.title,
                length: item.items.length,
            }));

            // console.log(titles)
            setTitle(titles)
            setCount(totalCount);

        } catch (error) {
            console.log('Lỗi:', error);
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                overflowX: 'auto',  // Thêm thuộc tính overflowX
                width: '100%',     // Định rõ chiều rộng của container cha
            }}
        >
            {Title && Title.length > 0 && Title.map((title, index) => (
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap:'wrap',
                        flex: '10',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                    }}
                    key={index}
                >
                    <TypoText variant="h4" color={randomColor} style={{ fontWeight: "bold" }}>
                        {title.title}
                    </TypoText>
                    <TypoText variant="h3" color="black" style={{ fontWeight: "bold" }}>
                        {title.length} of {Count}
                    </TypoText>
                </Box>
            ))}
        </Box>
    );
}

export default CountCard;


