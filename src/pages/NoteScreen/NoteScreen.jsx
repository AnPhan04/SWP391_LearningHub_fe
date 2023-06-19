import { useRef, useState, useEffect } from 'react';
import Kanban from '../../components/Kanban/Kanban';
import EditableDiv from './EditTableDiv';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InfoIcon from '@mui/icons-material/Info';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CountCard from './CountCard';
import AddColumn from '../../components/Kanban/AddColumn';

function NoteScreen() {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const [countCardKey, setCountCardKey] = useState(0);
    const [isUpdating, setIsUpdating] = useState(false);
    const kanbanRef = useRef(null);
    const updateTimeoutRef = useRef(null); // Thêm một ref để lưu trữ timeout ID

    useEffect(() => {
        console.log('render');
        const kanbanElement = kanbanRef.current;
        console.log(kanbanElement)
        const observer = new MutationObserver(() => {
            if (!isUpdating) {
                setIsUpdating(true);

                if (updateTimeoutRef.current) {
                    clearTimeout(updateTimeoutRef.current); // Hủy bỏ timeout cũ nếu có
                }

                updateTimeoutRef.current = setTimeout(() => {
                    setCountCardKey((prev) => prev + 1);
                    setIsUpdating(false);
                }, 200);
            }
        });

        if (kanbanElement) {
            observer.observe(kanbanElement, {
                childList: true,
                subtree: true,
                attributes: true,
            });
        }

        return () => {
            if (kanbanElement) {
                observer.disconnect();
            }

            if (updateTimeoutRef.current) {
                clearTimeout(updateTimeoutRef.current); // Hủy bỏ timeout nếu component bị unmount
            }
        };
    }, []);

    console.log('h:' + countCardKey);


    return (
        <div>
            <Box
                sx={{
                    fontWeight: 'bold',
                    marginLeft: 3
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <ArrowBackIcon fontSize="large" sx={{
                    '&:hover': {
                        cursor: 'pointer',
                        backgroundColor: '#F2F2F2',
                        borderRadius: '7px',
                    }
                }} />
                {isHovered && <Typography variant='subtitle1'
                    sx={{
                        fontWeight: 'bold',
                        color: 'white',
                        width: '75px', height: '30px',
                        backgroundColor: '#767676',
                        p: 0.4, borderRadius: '7px',
                        position: 'fixed',
                        top: '35px',
                        left: '10px',
                    }}
                >
                    Go back
                </Typography>}
            </Box>
            <Container fixed marginTop={15} style={{ paddingTop: 30 }}>
                <EditableDiv param={1} />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        p: 2, border: '2px solid #E1E1E1',
                        borderRadius: '10px',
                        marginTop: 2,
                        backgroundColor: '#FAFAFA',
                        '&:hover': {
                            border: '2px solid #1981C1',
                            cursor: 'pointer',
                        },
                    }}
                >
                    <InfoIcon color="primary" sx={{ marginRight: 1 }} />
                    <Typography variant='subtitle1' >
                        A single page to help you and your team team stay on top of all the moving parts.
                        Take a look around, then clear the sample tasks, projects, updates, and team members
                        so you can get started with a fresh template.
                    </Typography>
                </Box>
                <hr style={{ backgroundColor: '#E0E0E0', height: '2px' }} />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        overflowX: 'auto',  // Thêm thuộc tính overflowX
                        width: '100%',     // Định rõ chiều rộng của container cha
                    }}
                >
                    <Box
                        sx={{
                            flex: '0 0 150px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >
                        <TypoText variant="h4" color="#666666" style={{ fontWeight: "bold" }}>
                            Not started
                        </TypoText>
                        <TypoText variant="h3" color="black" style={{ fontWeight: "bold" }}>
                            1 of 6
                        </TypoText>
                    </Box>
                    <Box
                        sx={{
                            flex: '0 0 150px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <TypoText variant="h4" color="#8B6C1D" style={{ fontWeight: "bold" }}>
                            On-track
                        </TypoText>
                        <TypoText variant="h3" color="black" style={{ fontWeight: "bold" }}>
                            1 of 6
                        </TypoText>
                    </Box>
                    <Box
                        sx={{
                            flex: '0 0 150px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >
                        <TypoText variant="h4" color="#C45B1C" style={{ fontWeight: "bold" }}>
                            At risk
                        </TypoText>
                        <TypoText variant="h3" color="black" style={{ fontWeight: "bold" }}>
                            1 of 6
                        </TypoText>
                    </Box>
                    <Box
                        sx={{
                            flex: '0 0 150px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >
                        <TypoText variant="h4" color="#187B34" style={{ fontWeight: "bold" }}>
                            Completed
                        </TypoText>
                        <TypoText variant="h3" color="black" style={{ fontWeight: "bold" }}>
                            1 of 6
                        </TypoText>
                    </Box>
                </Box>
                <hr style={{ backgroundColor: '#E0E0E0', height: '2px' }} />
                <Typography variant='h5' sx={{ fontWeight: 'bold', marginTop: 2 }} >
                    📊 Task tracker
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        p: 2, border: '2px solid #E1E1E1',
                        borderRadius: '10px',
                        marginTop: 2,
                        backgroundColor: '#FAFAFA',
                        '&:hover': {
                            border: '2px solid #1981C1',
                            cursor: 'pointer',
                        },
                    }}
                >
                    <InfoIcon color="primary" sx={{ marginRight: 1 }} />
                    <Typography variant='subtitle1' >
                        Click on any card to view and update details.
                        Click <strong>+ New card</strong> to add tasks. Drag and
                        drop cards to move tasks through the stages.
                        Click the down arrow at the top of any stage to expand/collapse it.
                    </Typography>
                </Box>
                <Kanban boardId={1} />
            </Container>
        </div>
    );
}

export default NoteScreen;
